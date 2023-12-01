import express from 'express';
import { index, create, store, show, removeStudent, getActiveClass, getPresence, downloadAttendance } from '../controllers/classController.js';
import kelasValidation from '../middleware/form-validation/kelas.js';

const router = express.Router();

router.get( '/', index );
router.get( '/create', create );
router.post( '/', kelasValidation, store );
router.get( '/:id/presensi', show );
router.get( '/:id', show );
router.put( '/:classId/', removeStudent );
router.get( '/:classId/presence', getPresence );
router.get( '/:classId/download', downloadAttendance );

// router.get( '/active', getActiveClass );

export default router;