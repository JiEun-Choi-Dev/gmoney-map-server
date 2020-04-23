import { Module } from '@nestjs/common';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [ShopModule],
})
export class TaskModule {}
