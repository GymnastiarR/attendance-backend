import express from 'express';
import { store, index, manualUpdateAttandance, updateAttendance, downloadPresensi } from '../controllers/attandanceController.js';
import presensiValidation from '../middleware/form-validation/presensi.js';

const router = express.Router();

router.get( '/', index );
router.post( '/', store );
router.get( '/download', downloadPresensi );
router.put( '/', updateAttendance );
router.put( '/:id', presensiValidation, manualUpdateAttandance );

export default router;
