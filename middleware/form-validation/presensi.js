import joi from 'joi';

const bodySchema = joi.object( {
    status: joi.string().required(),
    date: joi.string().required(),
} );

const paramsSchema = joi.object( {
    id: joi.number().required()
} );

const validate = ( req, res, next ) => {
    try {
        const { error: bodyError } = bodySchema.validate( req.body );
        if ( bodyError ) throw new Error( bodyError );

        console.log( req.params );

        const { error: paramsError } = paramsSchema.validate( req.params );
        if ( paramsError ) throw new Error( paramsError );

        next();
    } catch ( error ) {
        return res.status( 400 ).json( { status: "Gagal", message: error.message } );
    }
};

export default validate;