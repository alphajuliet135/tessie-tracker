import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { DBService } from '../services/dbService';
import * as jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  // TODO implement right hashing logic for passwords
  const hashPassword = await bcrypt.hash(req.body.password, 8);

  // TODO get/set proper types for requests => ajv or else
  const email = req.body.email as string;

  console.log(hashPassword);

  const dbResult = (await DBService.queryTessieTrackerDB('SELECT * FROM users WHERE email = ?', [email])) as [];

  if (dbResult.length < 0) {
    return res.status(400).send('User not found!');
  }

  const authToken = jwt.sign({ email }, process.env.JWTSECRET, {
    expiresIn: 86400, // 24 hours
  });

  console.log(dbResult);

  res.status(200).send({
    status: 'This test is working',
    authToken,
  });
};

export const register = async (req: Request, res: Response) => {
  res.status(200).send('this route is still a todo');
};
