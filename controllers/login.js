import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import CustomError from "../custom/CustomError.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async ( req, res, next ) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique( {
            where: {
                email
            },
        } );

        if ( bcrypt.compareSync( password, user.password ) ) throw new CustomError( "Invalid password" );

        const token = jwt.sign( { id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "6h",
        } );

        res.status( 200 ).json( { token } );
    } catch ( error ) {
        next( error );
    }
};