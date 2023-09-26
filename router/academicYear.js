import express from "express";
import { store, index, activateAcademicYear } from "../controllers/academicYearController.js";
import tahunPelajaranValidation from "../middleware/form-validation/tahunPelajaran.js";

const router = express.Router();

router.get( '/', index );
router.post( '/', tahunPelajaranValidation, store );
router.get( '/:id/active', activateAcademicYear );

export default router;