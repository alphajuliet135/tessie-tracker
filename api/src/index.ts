import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRouter from './routers/authRouter';
import bodyParser from 'body-parser';
import dataRouter from './routers/dataRouter';
import { authLimiter, limiter } from './middleware/limiter';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome');
});

// routers
app.use(bodyParser.json());
app.use('/auth', authLimiter, authRouter);

app.use(limiter);
app.use('/data', dataRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
