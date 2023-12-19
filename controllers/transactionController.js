import { PrismaClient } from "@prisma/client";
import CustomError from "../custom/CustomError.js";

const prisma = new PrismaClient();

export const buy = async ( req, res, next ) => {
    try {
        const { canteenId } = req.params;
        const { rfid, totalAmount } = req.body;

        const detailedRfid = await prisma.rfid.findUnique( {
            where: {
                rfid: rfid
            }
        } );

        if ( !detailedRfid ) throw new CustomError( "RFID tidak ditemukan", 404 );

        const { id: rfidId, balance } = detailedRfid;

        if ( balance < totalAmount ) throw new CustomError( `Saldo Kurang. Saldo saat ini ${balance}`, 400 );

        const store = await prisma.store.findUnique( {
            where: {
                id: parseInt( canteenId )
            }
        } );

        if ( !store ) throw new CustomError( "Kantin tidak ditemukan", 404 );

        const newBalance = balance - totalAmount;

        await prisma.$transaction( [
            prisma.rfid.update( {
                where: {
                    id: parseInt( rfidId )
                },
                data: {
                    balance: parseInt( newBalance )
                }
            } ),
            prisma.transaction.create( {
                data: {
                    storeId: parseInt( canteenId ),
                    totalAmount: parseInt( totalAmount ),
                    rfidId: rfidId,
                }
            } )

        ] );

        res.status( 200 ).json( { message: `Transaksi Berhasil. Saldo saat ini ${newBalance}` } );
    } catch ( error ) {
        next( error );
    }
};

export const withdrawal = async ( req, res, next ) => {
    try {

    } catch ( error ) {
        next( error );
    }
};