import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './routes';

// Carregar variáveis de ambiente
dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    
    // CORS middleware
    this.app.use(cors({
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] 
        : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
      credentials: true
    }));
    
    if (process.env.NODE_ENV !== 'test') {
      this.app.use(morgan('combined'));
    }
    
    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  }

  private initializeRoutes(): void {
    // API routes
    this.app.use('/api', apiRoutes);
    
    // Root route
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: 'AR Cave Immersion API está funcionando!',
        version: '1.0.0',
        endpoints: {
          users: '/api/users',
          drawings: '/api/drawings',
          health: '/api/health'
        }
      });
    });

    // 404 handler
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: 'Endpoint não encontrado',
        path: req.originalUrl
      });
    });
  }

  private initializeErrorHandling(): void {
    // Global error handler
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('Error:', error);
      
      res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
          ? 'Erro interno do servidor' 
          : error.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
      });
    });
  }
}

export default App;
