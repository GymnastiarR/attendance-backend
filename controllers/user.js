import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const storeUser = async ( req, res, next ) => {
    try {
        const { email, password, nama, idRole } = req.body;

        const isExist = await prisma.user.findUnique( {
            where: {
                email
            }
        } );
        if ( isExist ) throw new Error( "Email Sudah Terdaftar" );
    } catch ( error ) {
        next( error );
    }
};

export const signIn = async ( req, res, next ) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique( {
            where: {
                email
            }
        } );

        if ( !user ) throw new Error( "Email Tidak Terdaftar" );

        const isMatch = bcrypt.compareSync( password, user.password );

        if ( !isMatch ) throw new Error( "Password Salah" );

        const token = jwt.sign( { id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" } );

        res.cookie( 'token', token ).status( 200 ).json( { status: "Berhasil Login", token } );

    } catch ( error ) {
        next( error );
    }
};