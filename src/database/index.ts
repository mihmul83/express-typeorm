/* eslint-disable node/no-path-concat */
import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { Config } from '../config/config.enum';
import * as path from 'path';
const config = new ConfigService(`.env.${process.env.NODE_ENV || 'development'}`);

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  port: 5432,
  host: config.get(Config.DB_HOST),
  username: config.get(Config.DB_USERNAME),
  password: config.get(Config.DB_PASSWORD),
  database: config.get(Config.DB_NAME),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: path.join('src', 'database', 'migrations')
  },
  synchronize: true,
  logging: true
};

export = {
  ...ormconfig
};
