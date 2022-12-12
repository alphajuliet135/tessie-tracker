import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { DBService } from '../services/dbService';

const login = async (req: Request, res: Response) => {
  // TODO implement right hashing logic for passwords
  const hashPassword = await bcrypt.hash(req.body.password, 8);

  // TODO get/set proper types for requests => ajv or else
  const email = req.body.email as string;

  console.log(hashPassword);

  const dbResult = await DBService.queryTessieTrackerDB('SELECT * FROM users WHERE email = ?', [email]);

  console.log(dbResult);

  res.status(200).send('login route working');
};

export { login };
