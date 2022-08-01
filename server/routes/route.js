import express from 'express';
const router=express.Router();

import { signupUser } from '../controller/user-controller.js';

router.post('/signup',signupUser);

export default router;