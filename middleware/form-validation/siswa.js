import joi from 'joi';
import CustomError from '../../custom/CustomError.js';

const schema = joi.object( {
    name: joi.string().required().label( 'Nama' ),
    nis: joi.string().required().label( 'NIS' ),
    classId: joi.string().required().label( 'Kelas' ),
} );

const options = {
    abortEarly: false,
};


const validate = ( req, res, next ) => {
    try {
        const { error } = schema.validate( req.body, options );
        if ( error ) throw new CustomError( JSON.stringify( error.details ), 400 );
        next();
    } catch ( error ) {
        next( error );
    }
};

export default validate;