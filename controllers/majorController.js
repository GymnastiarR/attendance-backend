import { PrismaClient } from "@prisma/client";
import CustomError from "../custom/CustomError.js";

const prisma = new PrismaClient();


export const index = async ( req, res, next ) => {
    try {
        const major = await prisma.major.findMany();

        res.status( 200 ).json( { data: major } );
    } catch ( error ) {
        next( error );
    }
};

export const store = async ( req, res, next ) => {
    try {
        const { name } = req.body;

        const isExist = await prisma.major.findUnique( {
            where: {
                name: name
            }
        } );

        if ( isExist ) throw new CustomError( "Jurusan Sudah Ada", 409 );

        const major = await prisma.major.create( {
            data: {
                name
            }
        } );

        res.status( 200 ).json( { message: "Berhasil Menambah Jurusan", data: major } );
    } catch ( error ) {
        console.log( error );
        next( error );
    }
};

export const update = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const major = await prisma.major.update( {
            where: {
                id: parseInt( id )
            },
            data: {
                name
            }
        } );
        res.status( 200 ).json( { message: "Jurusan Berhasil Diupdate" } );
    } catch ( error ) {
        next( error );
    }
};

export const destroy = async ( req, res, next ) => {
    try {
        const { id } = req.params;

        const major = await prisma.major.delete( {
            where: {
                id: parseInt( id )
            }
        } );
        res.status( 200 ).json( { message: "Jurusan Berhasil Dihapus" } );
    } catch ( error ) {
        next( error );
    }
};