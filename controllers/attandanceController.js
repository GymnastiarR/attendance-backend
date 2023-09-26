import { PrismaClient } from "@prisma/client";
import moment from "moment";
import XLSX from "xlsx";
import { PassThrough } from 'stream';
import path from "path";
import fs from "fs";
import extract from "extract-zip";
import AdmZip from "adm-zip";

const prisma = new PrismaClient();

export const store = async ( req, res, next ) => {
    try {
        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        const classes = await prisma.class.findMany( {
            where: {
                AcademicYear: {
                    isActive: true
                }
            }
        } );

        for await ( const clas of classes ) {
            const students = await prisma.student.findMany( {
                where: {
                    ClassStudent: {
                        some: {
                            classId: clas.id
                        }
                    }
                }
            } );

            await prisma.attendance.create( {
                data: {
                    classId: clas.id,
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
        }

        res.status( 200 ).json( { status: "Berhasil Menambah Presensi" } );
    } catch ( error ) {
        console.log( error );
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

        const attendance = await prisma.attendance.groupBy( {
            by: [ 'date' ],
            where: {
                academicYearId
            },
            orderBy: {
                date: "asc"
            }
        } );

        res.status( 200 ).json( { data: attendance } );
    } catch ( error ) {
        next( error );
    }
};

export const backupPeriodik = async ( req, res, next ) => {
    try {

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

        const student = await prisma.student.findUnique( {
            where: {
                id: parseInt( id ),
            },
            select: {
                ClassStudent: {
                    where: {
                        Class: {
                            academicYearId
                        }
                    }
                }
            }
        } );

        const attendance = await prisma.attendance.update( {
            where: {
                kelas_date: {
                    classId: student.ClassStudent[ 0 ].classId,
                    Date: new Date( date )
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

        const student = await prisma.student.findUnique( {
            where: {
                rfid: rfid
            },
            select: {
                id: true,
                ClassStudent: {
                    where: {
                        Class: {
                            academicYearId: academicYearId
                        }
                    },
                    select: {
                        classId: true,
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

        const isMatch = classes.find( ( clss ) => clss.id === student.ClassStudent[ 0 ].classId );
        if ( !isMatch ) throw new Error( "Unit Presensi Tidak Sesuai" );

        const { token } = req.query;
        if ( !token ) throw new Error( "Token Tidak Ditemukan" );

        const attendance = await prisma.attendance.update( {
            where: {
                classId_date: {
                    classId: student.ClassStudent[ 0 ].classId,
                    date: `${moment().format( "YYYY-MM-DD" )}T00:00:00.000Z`
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
                            datePresence: new Date()
                        }
                    }
                }
            }
        } );
        res.status( 200 ).json( { message: "Berhasil", data: attendance } );
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