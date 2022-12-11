import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { DBService } from '../services/dbService';

const login = async (req: Request, res: Response) => {
  //   const body = JSON.parse(req.body);

  const hashPassword = await bcrypt.hash(req.body.password, 8);

  hashPassword;

  DBService.queryTessieTrackerDB();

  res.status(200).send('login route working');
};

export { login };
