import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { CreateUserInput, UpdateUserInput } from '../types/User';

export class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.findAll();
      res.status(200).json({
        success: true,
        data: users,
        message: 'Usuários recuperados com sucesso'
      });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id || '0');
      
      if (isNaN(id) || id === 0) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }

      const user = await UserModel.findById(id);
      
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
        message: 'Usuário encontrado'
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email }: CreateUserInput = req.body;

      if (!name || !email) {
        res.status(400).json({
          success: false,
          message: 'Nome e email são obrigatórios'
        });
        return;
      }

      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: 'Email já está em uso'
        });
        return;
      }

      const newUser = await UserModel.create({ name, email });
      
      res.status(201).json({
        success: true,
        data: newUser,
        message: 'Usuário criado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id || '0');
      const userData: UpdateUserInput = req.body;

      if (isNaN(id) || id === 0) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }

      const existingUser = await UserModel.findById(id);
      if (!existingUser) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
        return;
      }

      if (userData.email) {
        const userWithEmail = await UserModel.findByEmail(userData.email);
        if (userWithEmail && userWithEmail.id !== id) {
          res.status(409).json({
            success: false,
            message: 'Email já está em uso'
          });
          return;
        }
      }

      const updatedUser = await UserModel.update(id, userData);
      
      res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'Usuário atualizado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id || '0');

      if (isNaN(id) || id === 0) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }

      // Verificar se o usuário existe
      const existingUser = await UserModel.findById(id);
      if (!existingUser) {
        res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
        return;
      }

      const deleted = await UserModel.delete(id);
      
      if (deleted) {
        res.status(200).json({
          success: true,
          message: 'Usuário deletado com sucesso'
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Erro ao deletar usuário'
        });
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async getUserDrawings(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id || '0');

      if (isNaN(userId) || userId === 0) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
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

      const drawings = await UserModel.getDrawingsByUserId(userId);
      
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
}
