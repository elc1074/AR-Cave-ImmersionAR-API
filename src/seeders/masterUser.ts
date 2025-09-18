import 'reflect-metadata';
import AppDataSource from '../config/database';
import { User } from '../entities/User';

export const MASTER_USER_ID = 1;
export const MASTER_USER_NAME = 'DEFAULT MASTER';

export const createMasterUser = async (): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  
  // Verificar se o usuário master já existe
  let masterUser = await userRepository.findOne({ 
    where: { id: MASTER_USER_ID } 
  });
  
  if (!masterUser) {
    // Criar o usuário master
    masterUser = userRepository.create({
      id: MASTER_USER_ID,
      name: MASTER_USER_NAME
    });
    
    await userRepository.save(masterUser);
    console.log('✅ Usuário DEFAULT MASTER criado com sucesso!');
  } else {
    console.log('ℹ️  Usuário DEFAULT MASTER já existe');
  }
  
  return masterUser;
};

export const getMasterUser = async (): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  
  let masterUser = await userRepository.findOne({ 
    where: { id: MASTER_USER_ID } 
  });
  
  if (!masterUser) {
    masterUser = await createMasterUser();
  }
  
  return masterUser;
};
