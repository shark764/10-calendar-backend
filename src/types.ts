import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface UserExtendedRequest extends Request {
  uId?: string;
  uName?: string;
  uToken?: string;
}
export interface UserExtendedJwtPayload extends JwtPayload {
  uId: string;
  name: string;
}
