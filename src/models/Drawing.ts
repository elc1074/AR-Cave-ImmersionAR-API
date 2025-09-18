import AppDataSource from '../config/database';
import { Drawing } from '../entities/Drawing';
import { CreateDrawingInput, UpdateDrawingInput } from '../types/Drawing';

const drawingRepository = () => AppDataSource.getRepository(Drawing);

export class DrawingModel {
  static async findAll(): Promise<Drawing[]> {
    return await drawingRepository().find({
      order: { created_at: 'DESC' },
      relations: ['user']
    });
  }

  static async findById(id: number): Promise<Drawing | null> {
    return await drawingRepository().findOne({ 
      where: { id },
      relations: ['user']
    });
  }

  static async findByUserId(userId: number): Promise<Drawing[]> {
    return await drawingRepository().find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
      relations: ['user']
    });
  }

  static async create(drawingData: CreateDrawingInput): Promise<Drawing> {
    const drawing = drawingRepository().create({
      user_id: drawingData.user_id,
      dados: drawingData.dados,
      cor: drawingData.cor
    });
    return await drawingRepository().save(drawing);
  }

  static async update(id: number, drawingData: UpdateDrawingInput): Promise<Drawing | null> {
    const drawing = await drawingRepository().findOne({ where: { id } });
    if (!drawing) return null;

    if (drawingData.dados !== undefined) {
      drawing.dados = drawingData.dados;
    }
    if (drawingData.cor !== undefined) {
      drawing.cor = drawingData.cor;
    }

    return await drawingRepository().save(drawing);
  }

  static async delete(id: number): Promise<boolean> {
    const result = await drawingRepository().delete(id);
    return result.affected! > 0;
  }

  static async deleteByUserId(userId: number): Promise<number> {
    const result = await drawingRepository().delete({ user_id: userId });
    return result.affected || 0;
  }
}
