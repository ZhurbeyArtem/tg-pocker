import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: join(process.cwd(), '.env') });
const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const host = configService.get('POSTGRES_HOST');
  const port = configService.get('POSTGRES_PORT');
  const username = configService.get('POSTGRES_USER');
  const password = configService.get('POSTGRES_PASSWORD');
  const database = configService.get('POSTGRES_DB');

  if (!host || !port || !username || !password || !database) {
    throw new Error('Database configuration is incomplete');
  }
  return {
    host,
    port,
    username,
    password,
    database,
    type: 'postgres',
    schema: 'public',
    logging: true,
    entities: [
      join(process.cwd(), 'dist', 'libs', 'entities', '**', '*.entity.{ts,js}'),
    ],
    migrations: [join(process.cwd(), 'migrations', '**', '*migration.ts')],
    migrationsRun: true,
    migrationsTableName: 'migrations',
  };
};

export const appDataSource = new DataSource(options());
