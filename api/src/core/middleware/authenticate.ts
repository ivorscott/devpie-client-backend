import { User } from '../users/model';
import { Response, NextFunction } from 'express';
import { IAuthedRequest } from '../types';
import { IncomingHttpHeaders } from 'http';

const authenticate = async (
  req: IAuthedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const headers: IncomingHttpHeaders = req.headers;
  const token = headers['x-auth'] as string;

  try {
    const user = await User.findbyToken(token);
    !user && Promise.reject();

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send();
  }
};

export { authenticate };
