import joi from 'joi';

const schema = joi.object( {
    year: joi.string().required(),
    semester: joi.string().valid( 'Ganjil', 'Genap' ).required(),
    duplicate: joi.boolean().required()
} );

const validate = ( req, res, next ) => {
    try {
        console.log( req.body );
        const { error } = schema.validate( req.body );
        if ( error ) throw new Error( error );
        next();
    } catch ( error ) {
        next( error );
    }
};

export default validate;