import type { Request, Response } from 'express';
import type { TypedRequestBody } from '@/types';

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

export const createUser = (
  req: TypedRequestBody<CreateUserBody>,
  res: Response
) => {
  const { name, email, password } = req.body;

  if (name.trim().length < 5) {
    res.status(400).json({
      ok: false,
      message: 'Name must be greater than 5 chars',
    });
  } else {
    res.json({
      ok: true,
      message: 'register',
      data: {
        name,
        email,
        password,
      },
    });
  }
};

export const renewToken = (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'renew',
  });
};

interface LoginBody {
  email: string;
  password: string;
}

export const login = (req: TypedRequestBody<LoginBody>, res: Response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    message: 'login',
    data: {
      email,
      password,
    },
  });
};
