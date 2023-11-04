import { Router } from "express";
import { store as shopStore, index as shopIndex, getMenus } from "../controllers/shopController.js";
import { store as menuStore } from "../controllers/menuController.js";
import shopValidation from "../middleware/form-validation/shopValidation.js";

const router = Router();

router.get( '/', shopIndex );
router.post( '/', shopValidation, shopStore );
router.post( '/:storeId', menuStore );
router.get( '/:storeId/menus', getMenus );

export default router;