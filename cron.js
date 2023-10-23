import { CronJob } from 'cron';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const task = new CronJob( '0 9 17 * * mon,tue,wed,thu,fri', async () => {
    try {
        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

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

        await prisma.attendance.create( {
            data: {
                date: new Date(),
                academicYearId: academicYearId,
                AttendanceStudent: {
                    createMany: {
                        data: students.map( ( student ) => {
                            return { studentId: student.id };
                        } )
                    }
                }
            }
        } );

        console.log( "Attendance Created" );
    } catch ( error ) {
        console.log( error );
    }
}, null, false, 'Asia/Jakarta' );

class Cron {
    static isRunning = false;
}

class AttendanceAutomation {
    start() {
        if ( Cron.isRunning ) {
            return "Already Run";
        }
        task.start();
        Cron.isRunning = true;
    }
    stop() {
        task.stop();
        Cron.isRunning = false;
    }

    getStatus() {
        return Cron.isRunning;
    }
}

export default AttendanceAutomation;