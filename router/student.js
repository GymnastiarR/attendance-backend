import express from 'express';
import { getAllSiswa, store, assignSiswaToKelas, create, getSiswa, assignRFID, downloadPresence, destroy, handleExcelUpload, duplicate } from '../controllers/studentController.js';
import validate from '../middleware/form-validation/siswa.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer( { storage: storage } );

router.get( '/create', create );
router.post( '/', validate, store );

router.get( '/', getAllSiswa );
router.get( '/:id', getSiswa );
router.put( '/:id/kelas', assignSiswaToKelas );
router.post( '/:id/rfid', assignRFID );
router.post( '/duplicate', duplicate );
router.get( '/:id/presence/download', downloadPresence );
router.delete( '/:id', destroy );
router.post( '/upload', upload.single( 'students' ), handleExcelUpload );

export default router;