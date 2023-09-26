import { Router } from "express";
import { index, store, assignAttendanceUnit } from "../controllers/attendanceUnitController.js";

const router = Router();

router.get( '/', index );
router.post( '/', store );
router.put( '/:id/kelas', assignAttendanceUnit );

export default router;