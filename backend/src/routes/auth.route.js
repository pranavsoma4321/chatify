import express from 'express';
import { signup , login, logout} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup )
router.post('/signin', login )
router.post('/signout', logout )

export default router;