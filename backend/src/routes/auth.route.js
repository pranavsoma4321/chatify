import express from 'express';
import { signup , login, logout, updateProfile} from '../controllers/auth.controller.js';
import { protectRoute } from '../../middleware/auth.middleware.js';
import { authRateLimiter } from '../../middleware/ratelimit.middleware.js';


const router = express.Router();

router.use(authRateLimiter);

router.post('/signup',   signup )
router.post('/login',  login )
router.post('/logout',  logout )

router.put('/update-profile', protectRoute, updateProfile)

router.get("/check", protectRoute, (req, res) => res.status(200).json({message: "You are authorized", user: req.user}))

export default router;