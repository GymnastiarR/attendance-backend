import express from 'express';
import { addBalance, checkBalance } from '../controllers/rfidController.js';

const router = express.Router();

router.put( '/:rfid', addBalance );
router.get( '/:rfid/balance', checkBalance );

export default router;