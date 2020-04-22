import { Injectable, HttpService, Logger } from '@nestjs/common';
import { GmoneyApiInterface } from './gmoney.interface';
import { ShopService } from 'src/shop/shop.service';
import { Shop } from '../shop/shop.interface';

@Injectable()
export class GmoneyService {
  public index: number = 1;
  public items: Shop[] = [];
  private readonly logger = new Logger(GmoneyService.name);

  constructor(
    private httpService: HttpService,
    private shopService: ShopService,
  ) {}

  async findAllGmoneyApiData() {
    this.logger.log(`CALL OpenAPI Server: index - ${this.index}`);
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

    const totalElement: number = RegionMnyFacltStus[0].head[0].list_total_count;
    const metadata = RegionMnyFacltStus[0].head[1];
    const elements: Shop[] = RegionMnyFacltStus[1].row;

    if (this.index * 1000 < totalElement) {
      console.log('more');
      this.index++;
      this.items = this.items.concat(elements);
      this.logger.log('Current Saved Contents: ' + this.items.length);
      this.findAllGmoneyApiData();
    } else {
      return this.savedData();
    }
  }

  async savedData() {
    this.logger.log('Saved Contents Processing');

    // insert db
    this.shopService.saveAll(this.items);

    // end insert db
    this.index = 1;
    this.items = [];

    return true;
  }
}
