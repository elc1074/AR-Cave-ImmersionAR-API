import AppDataSource from '../config/database';
import { User } from '../entities/User';
import { Drawing } from '../entities/Drawing';
import { CreateUserInput, UpdateUserInput } from '../types/User';

const userRepository = () => AppDataSource.getRepository(User);
const drawingRepository = () => AppDataSource.getRepository(Drawing);

export class UserModel {
  static async findAll(): Promise<User[]> {
    return await userRepository().find({
      order: { created_at: 'DESC' }
    });
  }

  static async findById(id: number): Promise<User | null> {
    return await userRepository().findOne({ 
      where: { id },
      relations: ['drawings']
    });
  }

  static async create(userData: CreateUserInput): Promise<User> {
    const user = userRepository().create(userData);
    return await userRepository().save(user);
  }

  static async update(id: number, userData: UpdateUserInput): Promise<User | null> {
    const user = await userRepository().findOne({ where: { id } });
    if (!user) return null;

    Object.assign(user, userData);
    return await userRepository().save(user);
  }

  static async delete(id: number): Promise<boolean> {
    const result = await userRepository().delete(id);
    return result.affected! > 0;
  }

  static async getDrawingsByUserId(userId: number): Promise<Drawing[]> {
    return await drawingRepository().find({
      where: { user_id: userId },
      order: { created_at: 'DESC' }
    });
  }
}
