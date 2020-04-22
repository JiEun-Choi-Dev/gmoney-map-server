import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { GmoneyService } from 'src/gmoney/gmoney.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private gemoneyService: GmoneyService) {}

  //   @Cron(CronExpression.EVERY_15_SECONDS)
  @Timeout(4)
  handleCron() {
    const start_dt = new Date();
    this.logger.log('[API Saved DB Migration] Processing Start - ' + start_dt);
    this.gemoneyService.findAllGmoneyApiData().then(res => {
      const end_dt = new Date();

      const diff_time = end_dt.getTime() - start_dt.getTime();

      this.logger.log(
        '[API Saved DB Migration] Processing end - ' + diff_time / 1000,
      );
    });
  }
}
