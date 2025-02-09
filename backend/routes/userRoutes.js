import express from 'express';
import { handleUserLogin, handleUserSignup } from '../controllers/userController.js';

const router = express.Router();

// User Signup Route
router.post('/signup', handleUserSignup);

// User Login Route
router.post('/login', handleUserLogin);

// // User Logout Route
// router.get('/logout', logoutUser);

export default router;
