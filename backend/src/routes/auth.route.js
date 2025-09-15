import express from 'express';
import { signup , login, logout, updateProfile} from '../controllers/auth.controller.js';
import { protectRoute } from './middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup )
router.post('/signin', login )
router.post('/signout', logout )

router.put('/update-profile', protectRoute, updateProfile)

router.get("/check", protectRoute, (req, res) => res.status(200).json({message: "You are authorized", user: req.user}))

export default router;