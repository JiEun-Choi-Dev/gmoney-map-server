import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { ShopMeta, IShop } from './shop.interface';

@Injectable()
export class ShopService {
  constructor(
    @Inject('SHOP_MODEL')
    private shopModel: Model<IShop>,
  ) {}

  async saveAll(args: IShop[]): Promise<IShop[]> {
    return this.shopModel.insertMany(args);
  }

  async clearAll() {
    return this.shopModel.deleteMany({});
  }
}
