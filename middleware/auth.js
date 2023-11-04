import jwt from 'jsonwebtoken';
import env from 'dotenv/config';
import CustomError from '../custom/CustomError.js';

export const Authorization = ( roles ) => {
    return ( req, res, next ) => {
        try {
            req.user = { role: 'guest' };

            if ( !req.headers.authorization || !req.headers.authorization.startsWith( 'Bearer' ) ) {
                throw new CustomError( 'Unauthorized', 401 );
            }

            const token = req.headers.authorization.split( ' ' )[ 1 ];

            jwt.verify( token, process.env.JWT_SECRET, ( error, decoded ) => {
                if ( error ) throw new CustomError( 'Unauthorized', 401 );

                req.user = decoded;
            } );

            console.log( req.user );

            next();
        } catch ( error ) {
            next( error );
        }
    };
};

