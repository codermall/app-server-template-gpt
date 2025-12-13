import { Router } from 'express';
import healthRouter from './health.js';

const router: Router = Router();

// Mount routes
router.use('/', healthRouter);

export default router;

