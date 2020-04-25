import { Injectable, HttpService, Logger } from '@nestjs/common';
import { GmoneyApiInterface } from './gmoney.interface';
import { ShopService } from 'src/shop/shop.service';

@Injectable()
export class GmoneyService {
  public index: number = 1;
  public items: any[] = [];
  public totalElement: number = 0;
  private readonly logger = new Logger(GmoneyService.name);

  constructor(
    private httpService: HttpService,
    private shopService: ShopService,
  ) {}

  /**
   * API 에서 데이터를 수집합니다.
   */
  async savedGmoneyData() {
    if (this.items.length < this.totalElement || this.totalElement === 0) {
      this.logger.log(`CALLING OpenAPI Server...`);
      const {
        data: { RegionMnyFacltStus },
      } = await this.httpService
        .get(`https://openapi.gg.go.kr/RegionMnyFacltStus`, {
          params: {
            KEY: process.env.GMONEY_API_KEY,
            Type: 'json',
            pIndex: this.index,
            pSize: 1000,
          },
        })
        .toPromise();

      this.totalElement = RegionMnyFacltStus[0].head[0].list_total_count;
      const elements: GmoneyApiInterface[] = RegionMnyFacltStus[1].row;
      this.index++;
      this.items = this.items.concat(elements);

      const percent = ((this.items.length / this.totalElement) * 100).toFixed(
        2,
      );

      this.logger.log(
        `Current Saved Contents: [${percent}%] ${this.items.length} / ${this.totalElement}`,
      );

      try {
        this.logger.log('Start Save Mongodb');
        await this.shopService.saveAllByGmoneyResponse(elements);
      } catch (e) {
        this.logger.error('Update Error');
      } finally {
        this.logger.log(' G-Money Data Save End ');
      }

      // Recursive
      return this.savedGmoneyData();
    }

    this.index = 1;
    this.items = [];
    this.totalElement = 0;
  }
}
