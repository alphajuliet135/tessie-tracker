import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  //   const body = JSON.parse(req.body);

  res.status(200).send('login route working');
};
