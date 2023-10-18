import joi from 'joi';
import CustomError from '../../custom/CustomError.js';

const schema = joi.object( {
    year: joi.string().required().label( 'Tahun' ),
    semester: joi.string().valid( 'Ganjil', 'Genap' ).required().label( 'Semester' ),
    duplicate: joi.boolean().required()
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