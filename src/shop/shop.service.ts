import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IShopDocument, IShop } from './shop.interface';
import { ISearchParams } from './shop-api.dto';
import { GmoneyApiInterface } from '../gmoney/gmoney.interface';

@Injectable()
export class ShopService {
  constructor(
    @Inject('SHOP_MODEL')
    private shopModel: Model<IShopDocument>,
  ) {}

  async saveAllByGmoneyResponse(
    res: GmoneyApiInterface[],
  ): Promise<IShopDocument[]> {
    const convert_doc: IShop[] = res.map(item => ({
      ...item,
      location: {
        type: 'Point',
        coordinates: [
          Number(item.REFINE_WGS84_LOGT),
          Number(item.REFINE_WGS84_LAT),
        ],
      },
    }));
    return this.shopModel.insertMany(convert_doc);
  }

  async clearAll() {
    return this.shopModel.deleteMany({});
  }

  async findAll(params: ISearchParams) {
    console.log(params);
    const result = await this.shopModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'point',
            coordinates: [params.lng, params.lat],
          },
          distanceField: 'distance',
          maxDistance: params.distance,
        },
      },
      { $limit: 1000 },
    ]);

    console.log(result.length);
    return result;
  }
}
