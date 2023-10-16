import joi from 'joi';

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
        if ( error ) {
            return res.status( 400 ).json( { status: "Gagal", message: error.details } );
        }
        next();
    } catch ( error ) {
        console.log( error );
    }
};

export default validate;