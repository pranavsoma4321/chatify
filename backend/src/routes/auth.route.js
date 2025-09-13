import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('Signup endpoint');
})

router.get('/signin', (req, res) => {
    res.send('Login endpoint');
})

router.get('/signout', (req, res) => {
    res.send('logout endpoint');
})

export default router;