import { Module, HttpModule } from '@nestjs/common';
import { GmoneyService } from './gmoney.service';
import { ShopModule } from '../shop/shop.module';
import { ShopService } from '../shop/shop.service';

@Module({
  imports: [HttpModule],
  exports: [GmoneyService],
  providers: [GmoneyService, ShopService],
})
export class GmoneyModule {}
