import { Router } from 'express';
import userRoutes from './userRoutes';
import drawingRoutes from './drawingRoutes';

const router = Router();

// Middleware para todas as rotas da API
router.use('/users', userRoutes);
router.use('/drawings', drawingRoutes);

// Rota de health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

export default router;
