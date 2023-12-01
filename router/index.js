import express from 'express';
import major from './major.js';
import academicYear from './academicYear.js';
import clss from './class.js';
import ruangKelas from './ruangKelas.js';
import year from './year.js';
import attendance from './attendance.js';
import student from './student.js';
import attendanceUnit from './attendanceUnit.js';
import canteen from './canteen.js';
import login from './login.js';
import transaction from './transaction.js';
import rfid from './rfid.js';
import dashboard from './dashboard.js';
import CustomError from '../custom/CustomError.js';
import Socket from '../socket.js';
import { Prisma } from '@prisma/client';
import { Authorization } from '../middleware/auth.js';

const router = express.Router();

export default () => {
    router.use( '/jurusan', major );
    router.use( '/tahun-pelajaran', academicYear );
    router.use( '/kelas', clss );
    router.use( '/ruang-kelas', ruangKelas );
    router.use( '/tingkat', year );
    router.use( '/presensi', attendance );
    router.use( '/siswa', student );
    router.use( '/unit-presensi', attendanceUnit );
    router.use( '/kantin', canteen );
    router.use( '/login', login );
    router.use( '/transaction', transaction );
    router.use( '/dashboard', dashboard );
    router.get( '/rfid/:id', ( req, res, next ) => {
        const io = Socket.getSocket();

        io.emit( 'RFID', req.params.id );

        res.status( 200 ).json( { message: 'Scanned' } );
    } );

    router.use( '/rfid', rfid );

    router.use( ( err, req, res, next ) => {
        if ( err instanceof CustomError ) {
            return res.status( err.statusCode ).json( { message: err.message } );
        }

        if ( err instanceof Prisma.PrismaClientKnownRequestError ) {
            return res.status( 409 ).json( { message: err.message } );
        }

        res.status( 500 ).json( { message: err.message } );
    } );
    return router;
};