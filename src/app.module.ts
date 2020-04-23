import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task/task.service';
import { GmoneyModule } from './gmoney/gmoney.module';
import { DatabaseModule } from './database/database.module';
import { ShopModule } from './shop/shop.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    GmoneyModule,
    ShopModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
