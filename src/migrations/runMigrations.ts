import { connectDatabase, disconnectDatabase } from '../config/database';
import { createUsersTable } from './001_create_users_table';
import { createDrawingsTable } from './002_create_drawings_table';

const runMigrations = async (): Promise<void> => {
  try {
    console.log('🚀 Iniciando migrations...');
    
    // Conectar ao banco de dados
    await connectDatabase();
    
    // Executar migrations na ordem
    await createUsersTable();
    await createDrawingsTable();
    
    console.log('✅ Todas as migrations foram executadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante a execução das migrations:', error);
    process.exit(1);
  } finally {
    // Desconectar do banco de dados
    await disconnectDatabase();
  }
};

// Executar migrations se o arquivo for chamado diretamente
if (require.main === module) {
  runMigrations();
}

export default runMigrations;
