import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { AuthTokenPayload } from '../types/auth';

export const generateToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string): AuthTokenPayload => {
  return jwt.verify(token, config.jwt.secret) as AuthTokenPayload;
};
