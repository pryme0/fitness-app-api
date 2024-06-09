import { DataSource, DataSourceOptions } from 'typeorm';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: process.env.DB_PORT as unknown as any,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
