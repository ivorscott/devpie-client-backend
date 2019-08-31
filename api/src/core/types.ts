import { Request } from 'express';

export interface IAuthedRequest extends Request {
  user?: any;
  token?: string;
}
