import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { InitDB1666298164810 } from '../migrations/1666298164810-InitDB';
import { InitDB1666288457883 } from '../migrations/1666288457883-InitDB';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [__dirname + '../**/*entity.{ts,js}'],
  migrations: [InitDB1666298164810, InitDB1666288457883],
});
