import joi from 'joi';

const schema = joi.object( {
    name: joi.string().required(),
    yearId: joi.number().required(),
    majorId: joi.number().required(),
    classRoomId: joi.allow(),
    studentsId: joi.allow(),
    attendanceUnitId: joi.allow(),
} );

const validate = ( req, res, next ) => {
    try {
        const { error } = schema.validate( req.body, { abortEarly: false } );
        if ( error ) throw new Error( error );
        next();
    } catch ( error ) {
        return res.status( 400 ).json( { status: "Gagal", message: error.message } );
    }
};

export default validate;