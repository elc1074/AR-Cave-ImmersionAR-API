import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

// GET /api/users - Obter todos os usuários
router.get('/', UserController.getAllUsers);

// GET /api/users/:id - Obter usuário por ID
router.get('/:id', UserController.getUserById);

// POST /api/users - Criar novo usuário
router.post('/', UserController.createUser);

// PUT /api/users/:id - Atualizar usuário
router.put('/:id', UserController.updateUser);

// DELETE /api/users/:id - Deletar usuário
router.delete('/:id', UserController.deleteUser);

// GET /api/users/:id/drawings - Obter desenhos de um usuário
router.get('/:id/drawings', UserController.getUserDrawings);

export default router;
