import pool from '../config/database';

export const createUsersTable = async (): Promise<void> => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ Tabela "users" criada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabela "users":', error);
    throw error;
  }
};

export const dropUsersTable = async (): Promise<void> => {
  const query = 'DROP TABLE IF EXISTS users CASCADE;';
  
  try {
    await pool.query(query);
    console.log('✅ Tabela "users" removida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao remover tabela "users":', error);
    throw error;
  }
};
