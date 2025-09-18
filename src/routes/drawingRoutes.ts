import { Router } from 'express';
import { DrawingController } from '../controllers/DrawingController';

const router = Router();

// GET /api/drawings - Obter todos os desenhos
router.get('/', DrawingController.getAllDrawings);

// GET /api/drawings/:id - Obter desenho por ID
router.get('/:id', DrawingController.getDrawingById);

// POST /api/drawings - Criar novo desenho (automaticamente para usuário master)
router.post('/', DrawingController.createDrawing);

// PUT /api/drawings/:id - Atualizar desenho
router.put('/:id', DrawingController.updateDrawing);

// DELETE /api/drawings/:id - Deletar desenho
router.delete('/:id', DrawingController.deleteDrawing);

export default router;
