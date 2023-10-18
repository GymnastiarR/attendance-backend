import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const store = async ( req, res, next ) => {
    try {
        const { name } = req.body;

        const year = await prisma.year.create( {
            data: {
                name
            }
        } );


        res.status( 200 ).json( { status: "Tingkat Berhasil Ditambahkan", data: year } );
    } catch ( error ) {
        next( error );
    }
};

export const index = async ( req, res, next ) => {
    try {
        const year = await prisma.year.findMany();
        res.status( 200 ).json( { data: year } );
    } catch ( error ) {
        next( error );
    }
};