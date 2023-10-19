import { PrismaClient } from "@prisma/client";
import CustomError from "../custom/CustomError.js";

const prisma = new PrismaClient();

export const store = async ( req, res, next ) => {
    try {
        const { name } = req.body;

        const isExist = await prisma.year.findUnique( {
            where: {
                name: name
            }
        } );

        if ( isExist ) throw new CustomError( "Tingkat Sudah Ada", 409 );

        const year = await prisma.year.create( {
            data: {
                name
            }
        } );

        res.status( 200 ).json( { message: "Tingkat Berhasil Ditambahkan", data: year } );
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