import { PrismaClient } from "@prisma/client";
import moment from "moment-timezone";
import ExcelJs from "exceljs";

const prisma = new PrismaClient();

export const index = async ( req, res, next ) => {
    try {
        let academicYearId = ( await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } ) ).id;

        if ( req.query.tahunAjaran ) {
            academicYearId = parseInt( req.query.tahunAjaran );
        }

        const clss = await prisma.class.findMany( {
            where: {
                academicYearId
            },
            select: {
                id: true,
                name: true,
                // RuangKelas: {
                //     select: {
                //         nama: true
                //     }
                // },
                Major: {
                    select: {
                        name: true
                    }
                },
                Year: {
                    select: {
                        name: true
                    }
                },
                _count: {
                    select: {
                        ClassStudent: true
                    }
                }
            }
        } );

        res.status( 200 ).json( { data: clss } );
    } catch ( error ) {
        next( error );
    }
};

export const store = async ( req, res, next ) => {
    try {

        const { name, yearId, majorId, studentsId, attendanceUnitId } = req.body;

        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        let data = { name, yearId: parseInt( yearId ), majorId: parseInt( majorId ), academicYearId: parseInt( academicYearId ) };

        // if ( parseInt( idRuangKelas ) !== 0 ) data.idRuangKelas = parseInt( idRuangKelas );

        if ( parseInt( attendanceUnitId ) !== 0 ) data.attendanceUnitId = parseInt( attendanceUnitId );

        if ( studentsId.length > 0 ) data.ClassStudent = { create: studentsId.map( ( studentId ) => ( { studentId: studentId } ) ) };

        const clss = await prisma.class.create( {
            data: data
        } );

        res.status( 200 ).json( { message: "Kelas Berhasil Ditambahkan", data } );

    } catch ( error ) {
        next( error );
    }
};

export const create = async ( req, res, next ) => {
    try {
        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        // const ruangKelas = await prisma.ruangKelas.findMany( {
        //     select: {
        //         nama: true,
        //         id: true,
        //         Kelas: {
        //             where: {
        //                 idTahunPelajaran
        //             }
        //         }
        //     }
        // } );

        const major = await prisma.major.findMany();
        const student = await prisma.student.findMany();
        const year = await prisma.year.findMany();

        const attendanceUnit = await prisma.attendanceUnit.findMany( {
            select: {
                id: true,
                name: true,
                Class: {
                    where: {
                        academicYearId
                    },
                    select: {
                        name: true
                    }
                }
            }
        } );

        res.status( 200 ).json( { data: { major, student, year, attendanceUnit } } );
    } catch ( error ) {
        next( error );
    }
};

export const getActiveClass = async ( req, res, next ) => {
    try {
        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );
        const clss = await prisma.class.findMany( {
            where: {
                academicYearId
            }
        } );
        res.status( 200 ).json( { data: clss } );
    } catch ( error ) {
        next( error );
    }
};

export const getSiswaKelas = async ( req, res, next ) => {
    try {
        const { id: classId } = req.params;

        const StudentOnClass = await prisma.class.findMany( {
            where: {
                id: parseInt( classId )
            },
            select: {
                ClassStudent: {
                    select: {
                        Student: {
                            select: {
                                name: true, nis: true, rfid: true, id: true
                            }
                        }
                    }
                }
            }
        } );

        res.status( 200 ).json( { data: StudentOnClass } );
    } catch ( error ) {
        next( error );
    }
};

export const getPresence = async ( req, res, next ) => {
    try {
        const { classId } = req.params;

        const presensi = await prisma.attendance.findMany( {
            where: {
                classId: parseInt( classId )
            }
        } );

        res.status( 200 ).json( { data: presensi } );
    } catch ( error ) {
        next( error );
    }
};

export const downloadPresensiKelas = async ( req, res, next ) => {
    try {

    } catch ( error ) {
        next( error );
    }
};

export const show = async ( req, res, next ) => {
    try {
        const { id: classId } = req.params;

        moment.tz.setDefault( "Indonesia/Jakarta" );

        const attendance = await prisma.attendance.findFirst( {
            where: {
                date: `${moment().format( "YYYY-MM-DD" )}T00:00:00.000Z`
            },
        } );

        const clss = await prisma.class.findUnique( {
            where: {
                id: parseInt( classId )
            },
            include: {
                ClassStudent: {
                    select: {
                        Student: {
                            select: {
                                name: true,
                                nis: true,
                                rfid: true,
                                id: true,
                                Rfid: {
                                    select: {
                                        id: true,
                                        rfid: true
                                    }
                                },
                                AttendanceStudent: {
                                    where: {
                                        Attendance: {
                                            date: `${moment().format( "YYYY-MM-DD" )}T00:00:00.000Z`
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                Major: {
                    select: {
                        name: true
                    }
                },
                Year: {
                    select: {
                        name: true
                    }
                }
            }
        } );

        const attendanceStatus = await prisma.attendanceStudent.groupBy( {
            by: [ 'status' ],
            where: {
                Attendance: {
                    date: `${moment().format( "YYYY-MM-DD" )}T00:00:00.000Z`
                },
                studentId: {
                    in: clss.ClassStudent.map( student => student.Student.id )
                }
            },
            _count: {
                status: true
            }
        } );

        res.status( 200 ).json( { data: { ...clss, attendanceStatus } } );
    } catch ( error ) {
        next( error );
    }
};

export const removeStudent = async ( req, res, next ) => {
    try {
        const { classId } = req.params;
        const { studentId } = req.body;

        await prisma.class.update( {
            where: {
                id: parseInt( classId )
            },
            data: {
                ClassStudent: {
                    delete: {
                        class_student: {
                            classId: parseInt( classId ),
                            studentId: parseInt( studentId )
                        }
                    }
                }
            }
        } );

        res.status( 200 ).json( { message: "Berhasil" } );
    } catch ( error ) {
        next( error );
    }
};

export const downloadAttendance = async ( req, res, next ) => {
    try {
        moment.tz.setDefault( "Indonesia/Jakarta" );

        const defaultDate = moment().format( "YYYY-MM-DD" );

        const { dateStart = defaultDate, dateEnd = defaultDate } = req.query;
        const { classId } = req.params;

        const workbook = new ExcelJs.Workbook();

        const attendances = await prisma.attendance.findMany( {
            where: {
                date: {
                    gte: new Date( dateStart ),
                    lte: new Date( dateEnd )
                }
            },
            select: {
                date: true,
                AttendanceStudent: {
                    where: {
                        Student: {
                            ClassStudent: {
                                some: {
                                    classId: parseInt( classId )
                                }
                            }
                        }
                    },
                    select: {
                        status: true,
                        Student: {
                            select: {
                                name: true,
                                nis: true
                            }
                        }
                    },
                    orderBy: {
                        Student: {
                            name: 'asc'
                        }
                    }
                }
            }
        } );

        attendances.forEach( attendance => {
            const worksheet = workbook.addWorksheet( `${moment( attendance.date ).format( 'YYYY-MM-DD' )}` );

            worksheet.properties.defaultRowHeight = 26;

            worksheet.columns = [
                { header: 'No', key: 'no', width: 10, },
                { header: 'Nama', key: 'nama', width: 32 },
                { header: 'Status', key: 'status', width: 10 },
            ];

            worksheet.getRow( 1 ).font = { bold: true };

            worksheet.getColumn( 'A' ).alignment = { horizontal: 'center' };
            worksheet.getRow( 1 ).eachCell( { includeEmpty: false }, ( cell, colNumber ) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFF00' }, // Yellow color
                };
            } );

            worksheet.getCell( 'A1' ).border = {
                bottom: "thin",
                top: "thin",
                left: "thin",
                right: "thin",
            };

            const studentAndPresence = attendance.AttendanceStudent.map( ( item, index ) => {
                return [ index + 1, item.Student.name, item.status ];
            } );

            worksheet.addRows( studentAndPresence );

            worksheet.eachRow( { includeEmpty: false }, ( row, rowNumber ) => {
                row.eachCell( { includeEmpty: false }, ( cell, colNumber ) => {
                    cell.border = {
                        bottom: { style: 'thin' },
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                } );
            } );
        } );

        const buffer = await workbook.xlsx.writeBuffer();

        const fileName = ( dateStart === dateEnd ? new Date( dateStart ).toLocaleDateString() : `${new Date( dateStart ).toLocaleDateString()}-${new Date( dateEnd ).toLocaleDateString()}` );

        res.set( {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${fileName}.xlsx"`,
            'Content-Length': buffer.length,
        } );

        res.send( buffer );
    } catch ( error ) {
        next( error );
    }
};