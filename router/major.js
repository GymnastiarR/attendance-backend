import express from 'express';
import { store, destroy, update, index } from '../controllers/majorController.js';
import jurusanValidation from '../middleware/form-validation/jurusan.js';

const router = express.Router();

router.get( '/', index );
router.delete( '/:id', update );
router.put( '/:id', destroy );
router.post( '/', jurusanValidation, store );

export default router;