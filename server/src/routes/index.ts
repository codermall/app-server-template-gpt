import { Router } from 'express';
import healthRouter from './health.js';
import askRouter from './ask.js';

const router: Router = Router();

// Mount routes
router.use('/', [healthRouter, askRouter]);

export default router;

