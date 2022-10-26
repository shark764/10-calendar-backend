/**
 * ? Auth routes
 * ? host: "/api/v1/auth"
 */

import { Router } from 'express';
import { check } from 'express-validator';
import { createUser, login, renewToken } from '@/controllers/auth';
import { fieldsValidator, validateJWT } from '@/middleware';

const router = Router();

router.post('/renew', validateJWT, renewToken);

router.post(
  '/',
  // Middleware
  [
    // must be a valid email
    check('email', 'Must be a valid email').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  fieldsValidator,
  login
);

router.post(
  '/new',
  // Middleware
  [
    // name is required
    check('name', 'Name is required').not().isEmpty(),
    // must be a valid email
    check('email', 'Must be a valid email').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  fieldsValidator,
  createUser
);

export default router;
