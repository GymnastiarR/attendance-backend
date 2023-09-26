import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const destroy = ( req, res, next ) => {
    try {
        
    } catch (error) {
        next(error);
    }
};

export const store = async ( req, res, next ) => {
    try {

    } catch ( error ) {
        next( error );
    }
};