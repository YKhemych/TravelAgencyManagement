import { Config } from '../classes/config.class';

const params = {
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_HOST: process.env.SERVER_HOST,
  JWT_EXPIRES: process.env.JWT_EXPIRES,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  DB_URL: process.env.DB_URL,
  DB_TEST_URL: process.env.DB_TEST_URL,

  DEFAULT_LIMIT: process.env.DEFAULT_LIMIT,
};

export const config = new Config(params);
