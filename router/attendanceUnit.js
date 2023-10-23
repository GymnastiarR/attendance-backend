import { Router } from "express";
import { index, store, assignAttendanceUnit, destroy } from "../controllers/attendanceUnitController.js";
import attendanceUnitValidation from "../middleware/form-validation/attendanceUnit.js";

const router = Router();

router.get( '/', index );
router.post( '/', attendanceUnitValidation, store );
router.delete( '/:id', destroy );
router.put( '/:id/kelas', assignAttendanceUnit );

export default router;