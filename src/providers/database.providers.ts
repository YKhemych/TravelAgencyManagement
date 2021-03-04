import { Sequelize } from 'sequelize-typescript';
import { config } from '../config/config';

export const DatabaseProvider = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const databaseUrl = process.env.ENV === 'test' ? config.DB_TEST_URL : config.DB_URL;
    const sequelize = new Sequelize(databaseUrl, {
      modelPaths: [`${__dirname}/../models/*.model{.ts,.js}`],
      modelMatch: (filename, member) =>
        filename.substring(0, filename.indexOf('.model')).toLowerCase() === member.toLowerCase()
    });

    await sequelize.authenticate();

    await sequelize.sync();

    // await sequelize.sync({ force: true });

    return sequelize;
  }
};
