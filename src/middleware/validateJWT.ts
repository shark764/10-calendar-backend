import type { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import type { UserExtendedJwtPayload, UserExtendedRequest } from '@/types';

export const validateJWT = (
  req: UserExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  // x-token header
  const headerTokenString =
    process.env.HEADER_TOKEN_STRING ?? 'X-REQUEST-TOKEN';

  const token = req.header(headerTokenString);
  if (token === undefined) {
    return res
      .status(401)
      .json({ ok: false, message: 'Token was not sent in the request' });
  }

  try {
    const secret = process.env.SECRET_JWT_SEED;
    if (secret !== undefined) {
      const payload = verify(token, secret) as UserExtendedJwtPayload;
      req.uId = payload?.uId;
      req.uName = payload.name;
      req.uToken = token;
      return next();
    }

    return res.status(401).json({
      ok: false,
      message: 'No secret has been configured in server',
    });
  } catch (error) {
    return res.status(401).json('Invalid token');
  }
};
