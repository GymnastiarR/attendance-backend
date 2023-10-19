import express from 'express';
import { getAllSiswa, store, assignSiswaToKelas, create, getSiswa, assignRFID, downloadPresence, destroy } from '../controllers/studentController.js';
import validate from '../middleware/form-validation/siswa.js';

const router = express.Router();

router.get( '/create', create );
router.post( '/', validate, store );

router.get( '/', getAllSiswa );
router.get( '/:id', getSiswa );
router.put( '/:id/kelas', assignSiswaToKelas );
router.post( '/:id/rfid', assignRFID );
router.get( '/:id/presence/download', downloadPresence );
router.delete( '/:id', destroy );

export default router;