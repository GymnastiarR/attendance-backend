import { PrismaClient } from "@prisma/client";
import ExcelJs from "exceljs";
import CustomError from "../custom/CustomError.js";

const prisma = new PrismaClient();
export const store = async ( req, res, next ) => {
    try {
        const { name, classId, nis, rfid } = req.body;

        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        const isExist = await prisma.student.findUnique( {
            where: {
                nis: nis
            }
        } );

        if ( isExist ) throw new CustomError( "NIS Sudah Ada", 409 );

        let data = {
            name, nis, academicYearId: academicYearId
        };

        if ( parseInt( classId ) ) data.classId = classId;

        const student = await prisma.student.create( {
            data: data
        } );

        res.status( 200 ).json( { message: "Siswa Berhasil Ditambahkan", data: student } );

    } catch ( error ) {
        next( error );
    }
};

export const destroy = async ( req, res, next ) => {
    try {
        const { id } = req.params;

        const student = await prisma.student.delete( {
            where: {
                id: parseInt( id )
            }
        } );

        res.status( 200 ).json( { message: "Siswa Berhasil Dihapus" } );
    } catch ( error ) {
        next( error );
    }
};

export const handleExcelUpload = async ( req, res, next ) => {
    try {

        const file = req.file;

        const workbook = new ExcelJs.Workbook();

        await workbook.xlsx.load( file.buffer );

        // workbook.worksheets[ 0 ].

        // const 

        workbook.worksheets[ 0 ].eachRow( { includeEmpty: false }, ( row, index ) => {
            row.eachCell( { includeEmpty: false }, ( cell, index ) => {
                console.log( cell.col );
                // console.log( cell.value );
            } );
        } );

        res.status( 200 ).json( { message: "Berhasil" } );
    } catch ( error ) {
        next( error );
    }
};

export const getSiswaQuery = async ( req, res, next ) => {
    try {
        const siswa = await prisma.siswa.findMany( {
            where: {
                SiswaKelas: null
            }
        } );
    } catch ( error ) {
        next( error );
    }
};

export const getSiswa = async ( req, res, next ) => {
    try {
        const { id } = req.params;

        const { id: academicYear } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        const student = await prisma.student.findUnique( {
            where: {
                id: parseInt( id )
            },

            include: {
                AttendanceStudent: {
                    select: {
                        status: true,
                        datePresence: true,
                        Attendance: {
                            select: {
                                date: true
                            }
                        }
                    }
                },
                Class: {
                    select: {
                        name: true,
                        Year: {
                            select: {
                                name: true
                            }
                        },
                        Major: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        } );

        const counts = await prisma.attendanceStudent.groupBy( {
            by: [ 'status' ],
            where: {
                studentId: parseInt( id ),
            },
            _count: {
                status: true,
            },
        } );

        student.attendance = counts;

        res.status( 200 ).json( { data: student } );
    } catch ( error ) {
        next( error );
    }
};

export const downloadPresence = async ( req, res, next ) => {
    try {
        const workbook = new ExcelJs.Workbook();

        const worksheet = workbook.addWorksheet( 'Presensi' );

        worksheet.properties.defaultRowHeight = 25;

        const { id } = req.params;

        const { id: academicYear } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        const presences = await prisma.attendanceStudent.findMany( {
            where: {
                studentId: parseInt( id ),
                Attendance: {
                    academicYearId: academicYear
                }
            },
            include: {
                Attendance: true
            },
            orderBy: {
                Attendance: {
                    date: 'asc'
                }
            }
        } );

        const data = presences.map( ( item, index ) => {
            return [ index + 1, new Date( item.Attendance.date ).toLocaleDateString( 'id-ID', { weekday: "long", day: "2-digit", month: "long", year: "numeric" } ), item.status ];
        } );

        const student = await prisma.student.findUnique( {
            where: {
                id: parseInt( id )
            }
        } );

        worksheet.addTable( {
            name: 'MyTable',
            ref: 'A3',
            headerRow: true,
            style: {
                theme: 'TableStyleMedium6',
                showRowStripes: true,
            },
            columns: [
                { name: 'No', filterButton: true },
                { name: 'Tanggal', filterButton: false },
                { name: 'Status', filterButton: false },
            ],
            rows: data,
            displayName: 'Presensi',
        } );

        worksheet.mergeCells( 'A1:C1' );
        worksheet.getCell( 'A1' ).value = `Presensi : ${student.name}`;
        worksheet.getCell( 'A1' ).font = { bold: true };
        worksheet.getCell( 'A1' ).alignment = { horizontal: 'center' };
        // worksheet.getRow( '1' ).height = 40;

        worksheet.getColumn( 1 ).alignment = { horizontal: 'center' };
        worksheet.getColumn( 2 ).width = 50;
        worksheet.getColumn( 3 ).width = 30;

        const buffer = await workbook.xlsx.writeBuffer();

        res.set( {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="Presensi :    ${student.name}.xlsx"`,
            'Content-Length': buffer.length,
        } );

        res.send( buffer );
    } catch ( error ) {
        next( error );
    }
};

export const getAllSiswa = async ( req, res, next ) => {
    try {
        const { id: academicYearId } = await prisma.academicYear.findFirst( {
            where: {
                isActive: true
            }
        } );

        const { tanpa_kelas: tanpaKelas } = req.query;
        const { search } = req.query;

        let query = {};

        if ( search ) {
            query = {
                OR: [
                    { nis: search },
                    {
                        name: {
                            contains: search
                        }
                    }
                ]
            };
        }

        if ( tanpaKelas ) {
            const students = await getSiswaTanpaKelas( academicYearId, query );
            return res.status( 200 ).json( { data: students } );
        }

        const students = await prisma.student.findMany( {
            where: {
                academicYearId: academicYearId,
                ...query
            },
            include: {
                Class: {
                    select: {
                        name: true,
                        Year: {
                            select: {
                                name: true
                            }
                        },
                        Major: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        } );

        res.status( 200 ).json( { data: students } );

    } catch ( error ) {
        next( error );
    }
};

export const assignSiswaToKelas = async ( req, res, next ) => {
    try {
        const { id: studentId } = req.params;
        const { classId } = req.body;

        const student = await prisma.student.update( {
            where: {
                id: parseInt( studentId )
            },
            data: {
                classId: parseInt( classId )
            }
        } );

        res.status( 200 ).json( { message: "Berhasil", data: student } );
    } catch ( error ) {
        next( error );
    }
};

export const updateSiswa = async ( req, res, next ) => {
    try {

    } catch ( error ) {
        next( error );
    }
};

export const create = async ( req, res, next ) => {
    try {

        const clss = await prisma.class.findMany( {
            select: {
                name: true,
                id: true
            }
        } );

        res.status( 200 ).json( { data: clss } );
    } catch ( error ) {
        next( error );
    }
};

export const assignRFID = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const { rfid } = req.body;
        const isExist = await prisma.student.findUnique( {
            where: {
                rfid: rfid
            }
        } );

        if ( isExist ) throw new CustomError( "RFID Sudah Digunakan", 409 );

        const student = await prisma.student.update( {
            where: {
                id: parseInt( id )
            },
            data: {
                rfid
            }
        } );
        res.status( 200 ).json( { message: "Berhasil", data: student } );
    } catch ( error ) {
        next( error );
    }
};

const getSiswaTanpaKelas = function ( academicYearId, query ) {
    return prisma.student.findMany( {
        where: {
            academicYearId: academicYearId,
            classId: null,
            ...query
        },
    } );
};

export const show = ( req, res ) => {
    try {

    } catch ( error ) {
        next( error );
    }
};