import { Connection } from 'mongoose';
import { ShopSchema } from '../database/schemas/shop.schema';

export const shopProviders = [
  {
    provide: 'SHOP_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Shop', ShopSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
