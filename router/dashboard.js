import { Router } from 'express';
import { invoke } from '../controllers/dashboardController.js';

const router = Router();

router.get( '/', invoke );

export default router;