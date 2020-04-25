import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { GmoneyService } from 'src/gmoney/gmoney.service';
import { ShopService } from 'src/shop/shop.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private gemoneyService: GmoneyService,
    private shopService: ShopService,
  ) {}

  // @Timeout(0) // 바로 실행됨
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleCron() {
    this.logger.log(
      '[API Saved DB Migration] Processing Start - ' + new Date(),
    );
    this.shopService.clearAll();
    await this.gemoneyService.savedGmoneyData();
  }
}
