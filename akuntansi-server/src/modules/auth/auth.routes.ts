import { Router, type Router as RouterType } from 'express';
import { login } from './auth.controller.js';

const router: RouterType = Router();

router.post('/login', login);

export default router;

