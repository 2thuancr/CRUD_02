import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

// API Routes (JSON responses)
router.get('/users', UserController.getUsersApi);
router.get('/users/stats', UserController.getUserStats);

// Additional API routes for full REST API support
// router.post('/users', UserController.createUserApi);
// router.get('/users/:id', UserController.getUserApi);
// router.put('/users/:id', UserController.updateUserApi);
// router.delete('/users/:id', UserController.deleteUserApi);

export default router;

