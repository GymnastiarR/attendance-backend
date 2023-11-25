import { PrismaClient } from "@prisma/client";
import moment from "moment-timezone";
import XLSX from "xlsx";
import ExcelJs from "exceljs";
import path from "path";
import fs from "fs";
import extract from "extract-zip";
import AdmZip from "adm-zip";
import AttendanceAutomation from "../cron.js";

const prisma = new PrismaClient();

export const store = async ( req, res, next ) => {
    try {
        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        let date = req.body.date;

        if ( !date ) {
            date = new Date();
        }
        else {
            date = new Date( date );
        }

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
                date: date,
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

        res.status( 200 ).json( { message: "Berhasil Menambah Presensi" } );
    } catch ( error ) {
        next( error );
    }
};

export const index = async ( req, res, next ) => {
    try {
        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        const attendances = await prisma.attendance.groupBy( {
            by: [ 'date' ],
            where: {
                academicYearId
            },
            orderBy: {
                date: "asc"
            }
        } );

        const result = [];

        for await ( const attendance of attendances ) {
            const rs = await prisma.attendanceStudent.groupBy( {
                by: [ 'status' ],
                where: {
                    Attendance: {
                        date: attendance.date,
                        AcademicYear: {
                            isActive: true
                        }
                    }
                },
                _count: {
                    status: true
                }
            } );
            result.push( { date: attendance.date, data: rs } );
        }

        res.status( 200 ).json( { data: result } );

    } catch ( error ) {
        next( error );
    }
};

export const destroy = async ( req, res, next ) => {
    try {
        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        const date = req.params.date;

        await prisma.attendance.delete( {
            where: {
                academic_year_date: {
                    academicYearId: academicYearId,
                    date: date
                }
            }
        } );

        res.status( 200 ).json( { message: "Presensi Berhasil Di Hapus" } );
    } catch ( error ) {
        next( error );
    }
};

export const attendanceAutomationStatus = ( req, res, next ) => {
    try {
        const attendanceAutomation = new AttendanceAutomation();

        const status = attendanceAutomation.getStatus();

        res.status( 200 ).json( { status } );
    } catch ( error ) {
        next( error );
    }
};

export const runAttendanceAutomation = ( req, res, next ) => {
    try {
        const attendanceAutomation = new AttendanceAutomation();

        const status = attendanceAutomation.start();

        res.status( 200 ).json( { message: "Automasi Berhasil Dijalankan" } );
    } catch ( error ) {
        next( error );
    }
};

export const stopAttendanceAutomation = ( req, res, next ) => {
    try {
        const attendanceAutomation = new AttendanceAutomation();

        const status = attendanceAutomation.stop();

        res.status( 200 ).json( { message: "Automasi Berhasil Dimatikan" } );
    } catch ( error ) {
        next( error );
    }
};

export const manualUpdateAttandance = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const { status, date } = req.body;

        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        const attendance = await prisma.attendance.update( {
            where: {
                academic_year_date: {
                    academicYearId: academicYearId,
                    date: new Date( date )
                }
            },
            data: {
                AttendanceStudent: {
                    updateMany: {
                        where: {
                            studentId: parseInt( id )
                        },
                        data: {
                            status: status,
                            datePresence: new Date()
                        }
                    }
                }
            }
        } );

        res.status( 200 ).json( { message: "Oke" } );
    } catch ( error ) {
        next( error );
    }
};

export const updateAttendance = async ( req, res, next ) => {
    try {
        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        const { rfid, identifier } = req.query;

        const { id: rfidId } = await prisma.rfid.findUnique( {
            where: {
                rfid: rfid
            }
        } );

        const student = await prisma.student.findUnique( {
            where: {
                rfid: rfidId
            },
            select: {
                id: true,
                ClassStudent: {
                    where: {
                        Class: {
                            AcademicYear: {
                                isActive: true
                            }
                        }
                    },
                    select: {
                        Class: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        } );

        if ( !student ) throw new Error( "RFID Tidak Terdaftar" );

        const attendanceUnit = await prisma.attendanceUnit.findUnique( {
            where: {
                identifier: identifier
            }
        } );

        if ( !attendanceUnit ) throw new Error( "Unit Presensi Tidak Ditemukan" );

        const classes = await prisma.class.findMany( {
            where: {
                AttendanceUnit: {
                    identifier: identifier
                }
            }
        } );

        const isMatch = classes.find( ( clss ) => clss.id === student.ClassStudent[ 0 ].Class.id );

        if ( !isMatch ) throw new Error( "Unit Presensi Tidak Sesuai" );

        moment.tz.setDefault( "Indonesia/Jakarta" );

        // const { token } = req.query;
        // if ( !token ) throw new Error( "Token Tidak Ditemukan" );

        const attendance = await prisma.attendance.update( {
            where: {
                academic_year_date: {
                    date: `${moment().format( "YYYY-MM-DD" )}T00:00:00.000Z`,
                    academicYearId: academicYearId
                }
            },
            data: {
                AttendanceStudent: {
                    updateMany: {
                        where: {
                            studentId: student.id
                        },
                        data: {
                            status: "Hadir",
                            datePresence: moment().format()
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

export const downloadPresence = async ( req, res, next ) => {
    try {
        const { dateStart } = req.query;
        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        const workbook = new ExcelJs.Workbook();

        const classes = await prisma.class.findMany( {
            where: {
                AcademicYear: {
                    isActive: true
                }
            },
            select: {
                id: true,
                name: true,
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

        for await ( const clss of classes ) {
            const worksheet = workbook.addWorksheet( `${clss.Year.name} ${clss.Major.name} ${clss.name}` );

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

            const data = await prisma.attendance.findUnique( {
                where: {
                    academic_year_date: {
                        date: dateStart,
                        academicYearId: academicYearId
                    }
                },
                select: {
                    date: true,
                    AttendanceStudent: {
                        where: {
                            Student: {
                                ClassStudent: {
                                    every: {
                                        classId: clss.id
                                    }
                                }
                            }
                        },
                        select: {
                            Student: {
                                select: {
                                    name: true
                                }
                            },
                            status: true
                        }
                    }
                }
            } );

            const studentAndPresence = data.AttendanceStudent.map( ( item, index ) => {
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
        }

        const buffer = await workbook.xlsx.writeBuffer();

        res.set( {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${new Date( dateStart ).toLocaleDateString()}.xlsx"`,
            'Content-Length': buffer.length,
        } );

        res.send( buffer );
    } catch ( error ) {
        next( error );
    }
};

export const downloadPresensi = async ( req, res, next ) => {
    try {
        // wb.Props = {
        //     Title: "Coba",
        //     Subject: "Coba",
        //     Author: "Coba",
        //     CreatedDate: new Date()
        // };

        const date = await prisma.presensi.groupBy( {
            by: 'Date',
        } );

        console.log( date );

        const data = await prisma.presensi.findMany( {
            include: {
                PresensiSiswa: {
                    include: {
                        Siswa: true
                    },
                    orderBy: {
                        Siswa: {
                            nama: "asc"
                        }
                    }
                },
                Kelas: {
                    include: {
                        Jurusan: {
                            select: {
                                nama: true
                            }
                        },
                        Tingkat: {
                            select: {
                                nama: true
                            }
                        }
                    }
                }
            },
        } );

        fs.mkdirSync( path.join( './resource' ), { recursive: true } );

        const temp = {};
        date.forEach( ( { Date: tgl } ) => {
            temp[ tgl ] = data.filter( item => {
                return item.Date.toDateString() == tgl.toDateString();
            } );
        } );

        for ( const i in temp ) {
            const wb = XLSX.utils.book_new();
            temp[ i ].forEach( item => {
                wb.SheetNames.push( `${item.Kelas.Tingkat.nama} ${item.Kelas.Jurusan.nama} ${item.Kelas.nama}` );
                const isinya = item.PresensiSiswa.map( ( presensi ) => {
                    return { Nama: presensi.Siswa.nama, Status: presensi.status };
                } );

                const ws = XLSX.utils.json_to_sheet( isinya );
                wb.Sheets[ `${item.Kelas.Tingkat.nama} ${item.Kelas.Jurusan.nama} ${item.Kelas.nama}` ] = ws;
            } );
            XLSX.writeFile( wb, `./resource/${i.split( ' ' )[ 2 ]}.xls` );
        }

        const zip = new AdmZip();
        zip.addLocalFolder( './resource' );
        zip.writeZip( './resource.zip' );

        // console.log( temp );
        // res.json( { temp } );

        // data.forEach( item => {
        //     wb.SheetNames.push( `${item.Kelas.Tingkat.nama} ${item.Kelas.Jurusan.nama} ${item.Kelas.nama}` );
        //     const isinya = item.PresensiSiswa.map( ( presensi ) => {
        //         return { Nama: presensi.Siswa.nama, Status: presensi.status };
        //     } );

        //     const ws = XLSX.utils.json_to_sheet( isinya );
        //     wb.Sheets[ `${item.Kelas.Tingkat.nama} ${item.Kelas.Jurusan.nama} ${item.Kelas.nama}` ] = ws;
        // } );
        // // // console.log( wb );

        // const wbout = XLSX.writeFile( wb, './resource/test.xlsx' );

        // console.log( path.join( _dirname, '../public/data.xlsx' ) );
        // res.setHeader( 'Content-Disposition', 'attachment; filename=data.xlsx' );
        // res.setHeader( 'Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' );
        res.download( './resource.zip' );
        // res.status( 200 ).json( { message: "OK" } );
    } catch ( error ) {
        console.log( error );
        next( error );
    }
};

// export const getPresensi = async ( req, res, next ) => {
//     try {
//         const { id } = req.params;
//         const presensi = await prisma.
//         res.status( 200 ).json( { data: presensi } );
//     } catch ( error ) {
//         next( error );
//     }
// };