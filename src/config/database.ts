import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User, Drawing } from '../entities';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ar_cave_db',
  synchronize: process.env.NODE_ENV === 'development', // Apenas em desenvolvimento
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Drawing],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});

export const connectDatabase = async (): Promise<void> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('🗄️ Conectado ao PostgreSQL com TypeORM!');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('🗄️ Desconectado do PostgreSQL');
    }
  } catch (error) {
    console.error('❌ Erro ao desconectar do banco de dados:', error);
  }
};

export default AppDataSource;
