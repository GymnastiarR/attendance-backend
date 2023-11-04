import { Prisma } from "@prisma/client";

const prisma = new Prisma();

export const register = async ( req, res, next ) => {
    try {
        const { email, password, password_confirmation } = req.body;

        if ( password !== password_confirmation ) throw new CustomError( "Password confirmation doesn't match" );

        const user = await prisma.user.create( {
            data: {
                email,
                password
            }
        } );

        res.status( 201 ).json( { message: "User created" } );
    } catch ( error ) {
        next( error );
    }
};