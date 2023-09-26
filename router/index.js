import express from 'express';
import major from './major.js';
import academicYear from './academicYear.js';
import clss from './class.js';
import ruangKelas from './ruangKelas.js';
import year from './year.js';
import attendance from './attendance.js';
import student from './student.js';
import attendanceUnit from './attendanceUnit.js';
import { Prisma } from '@prisma/client';

const router = express.Router();
import Socket from '../socket.js';

export default () => {
    router.use( '/jurusan', major );
    router.use( '/tahun-pelajaran', academicYear );
    router.use( '/kelas', clss );
    router.use( '/ruang-kelas', ruangKelas );
    router.use( '/tingkat', year );
    router.use( '/presensi', attendance );
    router.use( '/siswa', student );
    router.use( '/unit-presensi', attendanceUnit );
    router.get( '/rfid/:id', ( req, res, next ) => {
        const io = Socket.getSocket();
        io.emit( 'RFID', req.params.id );
        res.status( 200 ).json( { message: 'Scanned' } );
    } );
    router.use( ( err, req, res, next ) => {
        if ( err instanceof Prisma.PrismaClientKnownRequestError ) {
            return res.status( 400 ).json( { message: err.message } );
        }
        res.status( 500 ).json( { message: err.message } );
    } );
    return router;
};