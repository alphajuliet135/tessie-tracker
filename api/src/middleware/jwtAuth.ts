import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  try {
    jwt.verify(token, process.env.JWTSECRET);
    next();
  } catch {
    return res.status(401).send({
      message: 'Unauthorized!',
    });
  }
};
