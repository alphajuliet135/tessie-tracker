import { Request, Response } from 'express';

export const getData = async (req: Request, res: Response) => {
  res.status(200).send('this route is still a todo');
};
