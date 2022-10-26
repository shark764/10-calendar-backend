import { compare, genSalt, hash } from 'bcrypt';
import type { Response } from 'express';
import { generateJWT } from '@/helpers/jwt';
import { User } from '@/models';
import type { TypedRequestBody, UserExtendedRequest } from '@/types';

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

    // Generate JWT
    const userData = resUser.toClient();
    const { id } = userData;
    const token = await generateJWT(id, name);

    return res.status(201).json({
      ok: true,
      message: 'register',
      data: {
        token,
        data: {
          ...userData,
        },
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

export const renewToken = async (req: UserExtendedRequest, res: Response) => {
  const { uId, uName } = req;
  const token = await generateJWT(uId as string, uName as string);

  res.json({
    ok: true,
    message: 'renew',
    data: {
      id: uId,
      name: uName,
      token,
    },
  });
};

interface LoginBody {
  email: string;
  password: string;
}

export const login = async (
  req: TypedRequestBody<LoginBody>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser === null) {
      return res
        .status(400)
        .json({ ok: false, message: 'User doesn\'t exist in database' });
    }
    const isValidPassword = await compare(password, existingUser.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ ok: false, message: 'Password is incorrect' });
    }

    // Generate JWT
    const userData = existingUser.toClient();
    const { id, name } = userData;
    const token = await generateJWT(id, name);

    return res.status(200).json({
      ok: true,
      message: 'login',
      data: {
        token,
        data: {
          ...userData,
        },
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
