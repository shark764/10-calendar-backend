import { genSalt, hash } from 'bcrypt';
import type { Request, Response } from 'express';
import { User } from '@/models';
import type { TypedRequestBody } from '@/types';

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (
  req: TypedRequestBody<CreateUserBody>,
  res: Response
) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser !== null) {
      return res
        .status(400)
        .json({ ok: false, message: 'User already exists in database' });
    }

    const newUser = new User({ name, email, password });

    // Encrypt password
    // 10 rounds by default
    const salt = await genSalt();
    const encrypted = await hash(password, salt);
    newUser.password = encrypted;

    const resUser = await newUser.save();

    return res.status(201).json({
      ok: true,
      message: 'register',
      data: {
        ...resUser.toClient(),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Please contact the administrator',
    });
  }
};

export const renewToken = (_: Request, res: Response) => {
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
