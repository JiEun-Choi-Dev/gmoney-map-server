import { Module, HttpModule } from '@nestjs/common';
import { GmoneyService } from './gmoney.service';
import { ShopModule } from '../shop/shop.module';
import { ShopService } from '../shop/shop.service';
import { shopProviders } from '../shop/shop.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  exports: [GmoneyService],
  providers: [GmoneyService, ShopService, ...shopProviders],
})
export class GmoneyModule {}
