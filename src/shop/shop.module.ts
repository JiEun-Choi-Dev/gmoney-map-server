import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { shopProviders } from './shop.providers';
import { ShopService } from './shop.service';
import { GmoneyModule } from '../gmoney/gmoney.module';

@Module({
  imports: [DatabaseModule, GmoneyModule],
  exports: [ShopService],
  providers: [...shopProviders, ShopService],
})
export class ShopModule {}
