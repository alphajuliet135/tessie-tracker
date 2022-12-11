import express from 'express';
import { login } from '../controllers/loginController';

const router = express.Router();

/* GET articles */
router.get('/', login);

export { router as default };
