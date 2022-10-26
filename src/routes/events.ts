/**
 * ? Events routes
 * ? host: "/api/v1/events"
 */

import { Router } from 'express';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '@/controllers/events';
import { validateJWT } from '@/middleware';

const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

export default router;
