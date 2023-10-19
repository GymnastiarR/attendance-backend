import joi from 'joi';
import CustomError from '../../custom/CustomError.js';

const schema = joi.object( {
    name: joi.number().required().label( 'Nama' ),
} );

const validate = ( req, res, next ) => {
    try {
        const { error } = schema.validate( req.body );
        if ( error ) throw new CustomError( JSON.stringify( error.details ), 400 );
        next();
    } catch ( error ) {
        next( error );
    }
};

export default validate;    