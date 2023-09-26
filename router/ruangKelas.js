import express from 'express';
import { storeRuangKelas, getAllRuangKelas } from '../controllers/ruangKelas.js';

const router = express.Router();

router.get( '/', getAllRuangKelas );
router.post( '/', storeRuangKelas );
export default router;