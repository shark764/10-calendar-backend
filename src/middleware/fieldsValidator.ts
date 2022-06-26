import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const fieldsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  } else {
    next();
  }
};
