import express from 'express';
import { getData } from '../controllers/dataContorller';
import { verifyToken } from '../middleware/jwtAuth';

const router = express.Router();

router.get('/get', [verifyToken], getData);

export { router as default };
