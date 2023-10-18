import joi from 'joi';
import CustomError from '../../custom/CustomError.js';

const schema = joi.object( {
    name: joi.string().required().label( 'Nama' ),
    yearId: joi.number().required().label( 'Tingkat' ),
    majorId: joi.number().required().label( 'Jurusan' ),
    classRoomId: joi.allow().label( 'Kelas' ),
    studentsId: joi.allow().label( 'Siswa' ),
    attendanceUnitId: joi.allow().label( 'Unit Kehadiran' ),
} );

const validate = ( req, res, next ) => {
    try {
        const { error } = schema.validate( req.body, { abortEarly: false } );
        if ( error ) throw new CustomError( JSON.stringify( error.details ), 400 );
        next();
    } catch ( error ) {
        return res.status( 400 ).json( { status: "Gagal", message: error.message } );
    }
};

export default validate;