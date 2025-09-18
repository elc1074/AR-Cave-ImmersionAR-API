import 'reflect-metadata';
import { connectDatabase, disconnectDatabase } from '../config/database';

const initializeDatabase = async (): Promise<void> => {
  try {
    console.log('🚀 Inicializando banco de dados com TypeORM...');
    
    // Conectar ao banco de dados (synchronize está ativo em development)
    await connectDatabase();
    
    console.log('✅ Banco de dados inicializado com sucesso!');
    console.log('📋 Tabelas criadas/atualizadas automaticamente pelo TypeORM');
  } catch (error) {
    console.error('❌ Erro durante a inicialização do banco:', error);
    process.exit(1);
  } finally {
    // Desconectar do banco de dados
    await disconnectDatabase();
  }
};

// Executar inicialização se o arquivo for chamado diretamente
if (require.main === module) {
  initializeDatabase();
}

export default initializeDatabase;
