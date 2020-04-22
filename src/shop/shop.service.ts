import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Shop } from './shop.interface';

@Injectable()
export class ShopService {
  constructor(
    @Inject('SHOP_MODEL')
    private shopModel: Model<Shop>,
  ) {}

  async saveAll(args: Shop[]): Promise<Shop[]> {
    return this.shopModel.insertMany(args);
  }
}
