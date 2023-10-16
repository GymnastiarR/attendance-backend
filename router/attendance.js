import express from 'express';
import { store, index, manualUpdateAttandance, updateAttendance, downloadPresence } from '../controllers/attandanceController.js';
import presensiValidation from '../middleware/form-validation/presensi.js';

const router = express.Router();

router.get( '/', index );
router.post( '/', store );
router.get( '/download', downloadPresence );
router.put( '/', updateAttendance );
router.put( '/:id', presensiValidation, manualUpdateAttandance );

export default router;
