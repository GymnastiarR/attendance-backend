import express from 'express';
import { store, index } from '../controllers/yearController.js';

const router = express.Router();

router.get( '/', index );
router.post( '/', store );

export default router;