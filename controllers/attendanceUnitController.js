import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const store = async ( req, res, next ) => {
    try {
        const { name, identifier } = req.body;

        const attendanceUnit = await prisma.attendanceUnit.create( {
            data: {
                name: name,
                identifier: identifier
            }
        } );

        res.status( 200 ).json( { status: "Unit Presensi Berhasil Ditambahkan", data: attendanceUnit } );
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

        const attendanceUnit = await prisma.attendanceUnit.findMany( {
            include: {
                Class: {
                    where: {
                        academicYearId
                    },
                    select: {
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
                        name: true
                    }
                }
            }
        } );

        res.status( 200 ).json( { data: attendanceUnit } );
    } catch ( error ) {
        next( error );
    }
};

export const updateUnitPresensi = async ( req, res, next ) => {

};

export const deleteUnitPresensi = async ( req, res, next ) => {

};

export const assignAttendanceUnit = async ( req, res, next ) => {
    try {
        const { id: attendanceUnitId } = req.params;
        const { classId } = req.body;

        const attendanceUnit = await prisma.attendanceUnit.findUnique( {
            where: {
                id: parseInt( attendanceUnitId )
            }
        } );

        if ( !attendanceUnit ) throw new Error( "Unit Presensi Tidak Ditemukan" );

        const clss = await prisma.class.update( {
            where: {
                id: parseInt( classId )
            },
            data: {
                attendanceUnitId: parseInt( attendanceUnitId )
            }
        } );

        res.status( 200 ).json( { message: "Berhasil Mengassign Unit Presensi" } );
    } catch ( error ) {
        next( error );
    }
};