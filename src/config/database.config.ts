import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'task_management',
  entities: [Task],
  synchronize: process.env.NODE_ENV !== 'production', // Don't use in production
};
