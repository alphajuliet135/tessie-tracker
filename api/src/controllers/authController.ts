import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { TessieTrackerDBService } from '../services/dbService';
import * as jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    // TODO get/set proper types for requests => ajv or else
    const hashPassword = await bcrypt.hash(req.body.password, 8);
    const email = req.body.email;
    const name = req.body.name;
    const token = req.body.token;
    const changedInitPassword = true;

    if (!token) {
      return res.status(400).send('No token found in request!');
    }

    const dbTokenResult = await TessieTrackerDBService.queryUsersTable(
      'SELECT permission_group, used FROM permission_tokens WHERE token_code = ?',
      [token],
    );

    if (dbTokenResult[0].used === 1) {
      return res.status(400).send('Token is invalid');
    }

    const permissionGroup = dbTokenResult[0].permission_group;

    // TODO reduce number of db calls
    await TessieTrackerDBService.queryUsersTable(
      'INSERT INTO `users`(email,password,name,permission_group,changed_init_password) VALUES (?,?,?,?,?);',
      [email, hashPassword, name, permissionGroup, changedInitPassword],
    );
    await TessieTrackerDBService.queryUsersTable('UPDATE permission_tokens SET used = 1 WHERE token_code = ?', [token]);

    res.status(200).send('User was successfully created');
  } catch (error) {
    res.status(400).send('An unexpected error occcurred while registering new user.');
    throw new Error(error);
  }
};

export const login = async (req: Request, res: Response) => {
  // TODO get/set proper types for requests => ajv or else
  const password = req.body.password as string;
  const email = req.body.email as string;

  const dbResult = await TessieTrackerDBService.queryUsersTable('SELECT * FROM users WHERE email = ?', [email]);
  if (dbResult.length < 0) {
    return res.status(400).send('Incorrect credentials!');
  }

  const user = dbResult[0];
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send('Incorrect credentials!');
  }

  const authToken = jwt.sign({ email, permission_group: user.permission_group }, process.env.JWTSECRET, {
    expiresIn: 10800, // 3 hours
  });

  res.status(200).send({
    name: user.name,
    permission_group: user.permission_group,
    changed_init_password: user.changed_init_password,
    authToken,
  });
};

export const changePassword = async (req: Request, res: Response) => {
  return 'TODO change password';
};
