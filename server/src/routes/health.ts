import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.json({
    ok: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;

