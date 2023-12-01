import { Router } from "express";
import { store as shopStore, index as shopIndex, getMenus, show, withdrawal, getHistories, destroy as destroyShop } from "../controllers/shopController.js";
import { destroy, store as menuStore, updateName, updatePrice } from "../controllers/menuController.js";
import shopValidation from "../middleware/form-validation/shopValidation.js";
import menuValidation from "../middleware/form-validation/menu.js";

const router = Router();

router.get( '/', shopIndex );
router.get( '/:id/withdrawal', withdrawal );
router.get( '/:id/history', getHistories );
router.post( '/', shopValidation, shopStore );
router.get( '/:id', show );
router.delete( '/:id', destroyShop );

router.post( '/:storeId', menuValidation, menuStore );
router.get( '/:storeId/menus', getMenus );
router.put( '/:storeId/menus/:id/name', updateName );
router.put( '/:storeId/menus/:id/price', updatePrice );
router.delete( '/:storeId/menus/:id', destroy );

router.get( '/:id/history' );

export default router;