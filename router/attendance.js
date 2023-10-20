import express from 'express';
import { store, index, manualUpdateAttandance, updateAttendance, downloadPresence } from '../controllers/attandanceController.js';
import presensiValidation from '../middleware/form-validation/presensi.js';
import createPresensiValidation from '../middleware/form-validation/createPresensi.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer( { storage: storage } );

router.get( '/', index );
router.post( '/', createPresensiValidation, store );
router.get( '/download', downloadPresence );
router.put( '/', updateAttendance );
router.put( '/:id', presensiValidation, manualUpdateAttandance );

export default router;
