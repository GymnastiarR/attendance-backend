import express from 'express';
import { getAllSiswa, store, assignSiswaToKelas, create, getSiswa, assignRFID, downloadPresence, destroy, handleExcelUpload, duplicate, update } from '../controllers/studentController.js';
import validate from '../middleware/form-validation/siswa.js';
import updateStudent from '../middleware/form-validation/updateStudent.js';
import multer from 'multer';
import { Authorization } from '../middleware/auth.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer( { storage: storage } );

router.get( '/create', create );
router.post( '/', validate, store );
router.put( '/:id', updateStudent, update );

router.get( '/', getAllSiswa );
router.get( '/:id', getSiswa );
router.put( '/:id/kelas', assignSiswaToKelas );
router.post( '/:id/rfid', assignRFID );
router.post( '/duplicate', duplicate );
router.get( '/:id/presence/download', downloadPresence );
router.delete( '/:id', destroy );
router.post( '/upload', upload.single( 'students' ), handleExcelUpload );

export default router;