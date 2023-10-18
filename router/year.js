import express from 'express';
import { store, index } from '../controllers/yearController.js';
import year from '../middleware/form-validation/year.js';

const router = express.Router();

router.get( '/', index );
router.post( '/', year, store );

export default router;