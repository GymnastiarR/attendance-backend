import joi from 'joi';

const schema = joi.object( {
    name: joi.string().required().messages( { "nama.required": "Nama Harus Diisi" } ),
    nis: joi.string().required(),
    classId: joi.string().required()
} );

const options = {
    abortEarly: false,
    language: {
        key: '{{key}} ',
        string: {
            alphanum: 'should only contain letters and numbers',
            min: 'should have a minimum length of {{limit}} characters',
            max: 'should have a maximum length of {{limit}} characters',
            email: 'is not a valid email',
            pattern: 'should match the pattern required',
            required: 'is required',
        },
        any: {
            required: 'Harus Diisi',
        },
    },
};


const validate = ( req, res, next ) => {
    try {
        const { error } = schema.validate( req.body, options );
        if ( error ) throw new Error( error );
        next();
    } catch ( error ) {
        return res.status( 400 ).json( { status: "Gagal", message: error.message } );
    }
};

export default validate;