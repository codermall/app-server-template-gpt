import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

export function createApp(): Express {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api', router);

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Cannot ${req.method} ${req.path}`,
    });
  });

  // Error handler
  app.use(errorHandler);

  return app;
}

