import { PrismaClient } from "@prisma/client";
import moment from "moment-timezone";


const prisma = new PrismaClient();

export const invoke = async ( req, res, next ) => {
    try {
        const students = await prisma.student.findMany( {
            where: {
                AcademicYearStudent: {
                    some: {
                        AcademicYear: {
                            isActive: true
                        }
                    }
                }
            }
        } );

        moment.tz.setDefault( "Indonesia/Jakarta" );

        const attendance = await prisma.attendance.findFirst( {
            where: {
                date: `${moment().format( "YYYY-MM-DD" )}T00:00:00.000Z`
            },
        } );

        const attendanceStatus = await prisma.attendanceStudent.groupBy( {
            by: [ 'status' ],
            where: {
                attendanceId: attendance.id
            },
            _count: {
                status: true
            }
        } );

        res.status( 200 ).json( { data: { students, attendanceStatus } } );
    } catch ( error ) {
        next( error );
    }
};