import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { shopProviders } from './shop.providers';
import { ShopService } from './shop.service';
import { GmoneyModule } from '../gmoney/gmoney.module';
import { ShopController } from './shop.controller';

@Module({
  imports: [DatabaseModule, GmoneyModule],
  exports: [ShopService],
  providers: [...shopProviders, ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
