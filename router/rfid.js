import express from 'express';
import { addBalance } from '../controllers/rfidController.js';

const router = express.Router();

router.put( '/:id', addBalance );

export default router;