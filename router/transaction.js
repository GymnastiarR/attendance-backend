import { Router } from "express";
import { buy } from "../controllers/transactionController.js";

const router = Router();

router.post( '/buy/canteen/:canteenId', buy );
router.get( '/', ( req, res ) => {
    res.send( 'Hello World!' );
} );

export default router;