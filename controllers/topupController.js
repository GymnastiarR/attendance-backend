import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addBalance = async ( req, res, next ) => {
    try {

    } catch ( error ) {
        next( error );
    }
};

export const checkBalance = async ( req, res, next ) => {
    try {
        const { rfid } = req.params;

        const { id, balance } = await prisma.rfid.findUnique( {
            where: {
                rfid
            }
        } );

        if ( !id ) throw new Error( "RFID tidak ditemukan" );

        res.status( 200 ).json( { status: "success", data: { balance: balance } } );
    } catch ( error ) {
        next( error );
    }
};

// export const transferBalance = async ( req, res, next ) => {
//     try {
//         const { rfid } = req.params;
//         const { amount } = req.body;

//         const { balance } = await prisma.rfid.findUnique( {
//             where: {
//                 rfid
//             }
//         } );

//         if ( balance < amount ) {
//             throw new Error( "Saldo tidak cukup" );
//         }

//         await prisma.rfid.update( {
//             where: {
//                 rfid
//             },
//             data: {
//                 balance: balance - amount
//             }
//         } );

//         res.status( 200 ).json( { status: "success", data: { balance: balance - amount } } );
//     } catch ( error ) {
//         next( error );
//     }
// };