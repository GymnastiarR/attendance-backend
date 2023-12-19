import { Router } from "express";
import { store as shopStore, index as shopIndex, show, withdrawal, getHistories, destroy as destroyShop } from "../controllers/shopController.js";
import shopValidation from "../middleware/form-validation/shopValidation.js";
import menuValidation from "../middleware/form-validation/menu.js";

const router = Router();

router.get( '/', shopIndex );
router.get( '/:id/withdrawal', withdrawal );
router.get( '/:id/history', getHistories );
router.post( '/', shopValidation, shopStore );
router.get( '/:id', show );
router.delete( '/:id', destroyShop );

router.get( '/:id/history' );

export default router;