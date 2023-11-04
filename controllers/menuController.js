import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const store = async ( req, res, next ) => {
    try {
        const { storeId } = req.params;
        const { name, price } = req.body;

        await prisma.menu.create( {
            data: {
                name: name,
                price: price,
                storeId: storeId
            }
        } );

        res.status( 201 ).json( {
            message: "Berhasil menambahkan menu baru",
        } );
    } catch ( error ) {
        next( error );
    }
};