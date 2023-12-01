import joi from 'joi';
import CustomError from '../../custom/CustomError.js';

const schema = joi.object( {
    name: joi.string().required().label( 'Nama Menu' ),
    price: joi.number().required().label( 'Harga' )
} );

const validate = ( req, res, next ) => {
    try {
        const { error } = schema.validate( req.body, { abortEarly: false } );
        if ( error ) throw new CustomError( JSON.stringify( error.details ), 400 );

        next();
    } catch ( error ) {
        next( error );
    }
};

export default validate;    