export class Config {
  public readonly SERVER_PORT: number;
  public readonly SERVER_HOST: string;
  public readonly JWT_EXPIRES: string;
  public readonly JWT_SECRET: string;
  public readonly JWT_REFRESH_EXPIRES: string;
  public readonly JWT_REFRESH_SECRET: string;

  public readonly DB_URL: string;
  public readonly DB_TEST_URL: string;

  public readonly DEFAULT_LIMIT: number;
  constructor(params: any) {
    this.validate(params);

    this.SERVER_PORT = parseInt(params.SERVER_PORT, 10) as number;
    this.SERVER_HOST = params.SERVER_HOST as string;
    this.JWT_EXPIRES = params.JWT_EXPIRES as string;
    this.JWT_SECRET = params.JWT_SECRET as string;
    this.JWT_REFRESH_EXPIRES = params.JWT_REFRESH_EXPIRES as string;
    this.JWT_REFRESH_SECRET = params.JWT_REFRESH_SECRET as string;

    this.DB_URL = params.DB_URL as string;
    this.DB_TEST_URL = params.DB_TEST_URL as string;
    this.DEFAULT_LIMIT = parseInt(params.DEFAULT_LIMIT, 10) as number;
  }

  private validate(params: any) {
    // we don't require full configuration to be set in order to do database migration
    if (process.env.ENV === 'migration') {
      return;
    }
    if (typeof params.SERVER_PORT === 'undefined') {
      throw new Error(`env variable SERVER_PORT is not set!`);
    }
    if (typeof params.SERVER_HOST === 'undefined') {
      throw new Error(`env variable SERVER_HOST is not set!`);
    }
    if (typeof params.JWT_SECRET === 'undefined') {
      throw Error(`env variable JWT_SECRET is not set!`);
    }
    if (typeof params.JWT_REFRESH_EXPIRES === 'undefined') {
      throw Error(`env variable JWT_REFRESH_EXPIRES is not set!`);
    }
    if (typeof params.JWT_REFRESH_SECRET === 'undefined') {
      throw Error(`env variable JWT_REFRESH_SECRET is not set!`);
    }
    if (typeof params.DB_URL === 'undefined') {
      throw Error(`env variable DB_URL is not set!`);
    }
    if (typeof params.DB_TEST_URL === 'undefined') {
      throw Error(`env variable DB_URL is not set!`);
    }
    if (typeof params.DEFAULT_LIMIT === 'undefined') {
      throw Error(`env variable DEFAULT_LIMIT is not set!`);
    }
  }
}
