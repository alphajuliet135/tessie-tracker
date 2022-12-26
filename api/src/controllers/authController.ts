import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { TessieTrackerDBService } from '../services/dbService';
import * as jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  res.status(200).send('this route is still a todo');
};

export const login = async (req: Request, res: Response) => {
  // TODO implement right hashing logic for passwords
  const hashPassword = await bcrypt.hash(req.body.password, 8);

  // TODO get/set proper types for requests => ajv or else
  const email = req.body.email as string;

  const dbResult = await TessieTrackerDBService.queryUsersTable('SELECT * FROM users WHERE email = ?', [email]);

  if (dbResult.length < 0) {
    return res.status(400).send('User not found!');
  }

  const user = dbResult[0];
  if (user.password !== hashPassword) {
    return res.status(400).send('Incorrect credentials!');
  }

  const authToken = jwt.sign({ email }, process.env.JWTSECRET, {
    expiresIn: 10800, // 3 hours
  });

  res.status(200).send({
    name: user.name,
    permission_group: user.permission_group,
    changed_init_password: user.changed_init_password,
    authToken,
  });
};
