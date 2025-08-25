import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

// Web Routes (HTML responses)
router.get('/', UserController.getHomePage);
router.get('/crud', UserController.getCreateUserForm);
router.post('/post-crud', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/edit-user/:id', UserController.getEditUserForm);
router.get('/edit-user', UserController.getEditUserForm); // Support query param
router.post('/put-crud', UserController.updateUser);
router.get('/delete-user/:id', UserController.deleteUser);
router.get('/delete-user', UserController.deleteUser); // Support query param

export default router;

