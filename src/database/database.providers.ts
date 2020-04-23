import * as mongoose from 'mongoose';
import constans from '../constants';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        `mongodb://${constans.MONGODB_HOST}:${constans.MONGODB_PORT}/${constans.MONGODB_DATABASE}`,
        {
          useNewUrlParser: true,
          readPreference: 'primary',
          ssl: false,
        },
      ),
  },
];
