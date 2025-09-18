import { Request, Response } from 'express';
import { DrawingModel } from '../models/Drawing';
import { UserModel } from '../models/User';
import { CreateDrawingInput, UpdateDrawingInput } from '../types/Drawing';

export class DrawingController {
  static async getAllDrawings(req: Request, res: Response): Promise<void> {
    try {
      const drawings = await DrawingModel.findAll();
      res.status(200).json({
        success: true,
        data: drawings,
        message: 'Desenhos recuperados com sucesso'
      });
    } catch (error) {
      console.error('Erro ao buscar desenhos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async getDrawingById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id || '0');
      
      if (isNaN(id) || id === 0) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }

      const drawing = await DrawingModel.findById(id);
      
      if (!drawing) {
        res.status(404).json({
          success: false,
          message: 'Desenho não encontrado'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: drawing,
        message: 'Desenho encontrado'
      });
    } catch (error) {
      console.error('Erro ao buscar desenho:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async getDrawingsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId || '0');
      
      if (isNaN(userId) || userId === 0) {
        res.status(400).json({
          success: false,
          message: 'ID do usuário inválido'
        });
        return;
      }

      // Verificar se o usuário existe
      const user = await UserModel.findById(userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
        return;
      }

      const drawings = await DrawingModel.findByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: drawings,
        message: 'Desenhos do usuário recuperados com sucesso'
      });
    } catch (error) {
      console.error('Erro ao buscar desenhos do usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async createDrawing(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, dados, cor }: CreateDrawingInput = req.body;

      // Validações básicas
      if (!user_id || !dados) {
        res.status(400).json({
          success: false,
          message: 'user_id e dados são obrigatórios'
        });
        return;
      }

      // Verificar se o usuário existe
      const user = await UserModel.findById(user_id);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
        return;
      }

      const newDrawing = await DrawingModel.create({ user_id, dados, cor });
      
      res.status(201).json({
        success: true,
        data: newDrawing,
        message: 'Desenho criado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao criar desenho:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async updateDrawing(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id || '0');
      const drawingData: UpdateDrawingInput = req.body;

      if (isNaN(id) || id === 0) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }

      if (!drawingData.dados && !drawingData.cor) {
        res.status(400).json({
          success: false,
          message: 'Pelo menos dados ou cor devem ser fornecidos para atualização'
        });
        return;
      }

      // Verificar se o desenho existe
      const existingDrawing = await DrawingModel.findById(id);
      if (!existingDrawing) {
        res.status(404).json({
          success: false,
          message: 'Desenho não encontrado'
        });
        return;
      }

      const updatedDrawing = await DrawingModel.update(id, drawingData);
      
      res.status(200).json({
        success: true,
        data: updatedDrawing,
        message: 'Desenho atualizado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao atualizar desenho:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async deleteDrawing(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id || '0');

      if (isNaN(id) || id === 0) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }

      // Verificar se o desenho existe
      const existingDrawing = await DrawingModel.findById(id);
      if (!existingDrawing) {
        res.status(404).json({
          success: false,
          message: 'Desenho não encontrado'
        });
        return;
      }

      const deleted = await DrawingModel.delete(id);
      
      if (deleted) {
        res.status(200).json({
          success: true,
          message: 'Desenho deletado com sucesso'
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Erro ao deletar desenho'
        });
      }
    } catch (error) {
      console.error('Erro ao deletar desenho:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}
