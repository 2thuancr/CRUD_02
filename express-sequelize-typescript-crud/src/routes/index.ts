import { Router } from 'express';
import webRoutes from './web';
import apiRoutes from './api';

const router = Router();

// Web routes
router.use('/', webRoutes);

// API routes
router.use('/api', apiRoutes);

export default router;

