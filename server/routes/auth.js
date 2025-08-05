import express from 'express';
import { signup, login, protect, updatePassword, getMe } from '../controllers/authController.js';
import { getUser, updateMe, deleteMe } from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes (require authentication)
router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

export default router;