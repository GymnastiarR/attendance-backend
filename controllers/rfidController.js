import { PrismaClient } from "@prisma/client";
import CustomError from "../custom/CustomError.js";
// import Socket from "../socket";
// import { expression } from "joi";

const prisma = new PrismaClient();

// export const store = async ( req, res, next ) => {
//     try {
//         const { id: RFID } = req.params;

//         const { token } = req.query;
//         const io = Socket.getSocket();

//         io.emit( "RFID", RFID );

//         res.status( 200 ).json( { status: "OK" } );
//     } catch ( error ) {
//         next( error );
//     }
// };

export const addBalance = async ( req, res, next ) => {
    try {
        const { rfid } = req.params;
        const { balance } = req.body;
        const { token } = req.query;

        if ( token !== process.env.KEY ) throw new CustomError( 'Token tidak valid', 400 );

        const detailRfid = await prisma.rfid.findUnique( {
            where: {
                rfid: rfid
            }
        } );

        if ( !detailRfid ) throw new Error( 'RFID tidak ditemukan' );

        const newBalance = detailRfid.balance + balance;

        await prisma.rfid.update( {
            where: {
                id: detailRfid.id
            },
            data: {
                balance: newBalance
            }
        } );

        res.status( 200 ).json( { message: 'Saldo berhasil ditambahkan' } );
    } catch ( error ) {
        next( error );
    }
};

export const checkBalance = async ( req, res, next ) => {
    try {
        const { rfid } = req.params;

        const detailRfid = await prisma.rfid.findFirst( {
            where: {
                rfid: rfid
            }
        } );

        if ( !detailRfid ) throw new Error( 'RFID tidak ditemukan' );

        res.status( 200 ).json( { balance: detailRfid.balance } );
    } catch ( error ) {
        next( error );
    }
};