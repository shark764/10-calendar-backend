/**
 * ? Auth routes
 * ? host: "/api/v1/auth"
 */

import { Router } from 'express';
import { createUser, login, renewToken } from '@/controllers/auth';

const router = Router();

router.get('/', renewToken);

router.post('/', login);

router.post('/new', createUser);

export default router;
