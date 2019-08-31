import { Request, Response, NextFunction } from 'express';

const {
  env: { NODE_ENV }
} = process;

const logger = (req: Request, _: Response, next: NextFunction) => {
  if (NODE_ENV === 'development') {
    console.log(`\n${req.method} ${req.url}\n`);
    console.log('Request Body = ', req.body);
  }
  next();
};

export { logger };
