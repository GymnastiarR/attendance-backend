import joi from 'joi';

const schema = joi.object( {
    name: joi.string().required()
} );

const validate = ( req, res, next ) => {
    try {
        const { error } = schema.validate( req.body );
        if ( error ) {
            return res.status( 400 ).json( { message: error.message } );
        }
        next();
    } catch ( error ) {
        next( error );
    }
};

export default validate;