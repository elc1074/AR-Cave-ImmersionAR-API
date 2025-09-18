import pool from '../config/database';

export const createDrawingsTable = async (): Promise<void> => {
  const query = `
    CREATE TABLE IF NOT EXISTS drawings (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      dados JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ Tabela "drawings" criada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabela "drawings":', error);
    throw error;
  }
};

export const dropDrawingsTable = async (): Promise<void> => {
  const query = 'DROP TABLE IF EXISTS drawings;';
  
  try {
    await pool.query(query);
    console.log('✅ Tabela "drawings" removida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao remover tabela "drawings":', error);
    throw error;
  }
};
