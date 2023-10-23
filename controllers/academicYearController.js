import { PrismaClient } from "@prisma/client";
import CustomError from "../custom/CustomError.js";

const prisma = new PrismaClient();

export const store = async ( req, res, next ) => {
    try {

        const { year, semester, duplicate } = req.body;

        const isExist = await prisma.academicYear.findUnique( {
            where: {
                year_semester: {
                    year, semester
                }
            }
        } );

        if ( isExist ) throw new CustomError( "Tahun Pelajaran Sudah Ada", 409 );

        let students = [];

        if ( duplicate ) {
            students = await prisma.student.findMany( {
                where: {
                    AcademicYearStudent: {
                        every: {
                            AcademicYear: {
                                isActive: true
                            }
                        }
                    }
                }
            } );
        }

        await prisma.academicYear.updateMany( {
            data: {
                isActive: false
            }
        } );

        await prisma.academicYear.create( {
            data: {
                year, semester, isActive: true,
                AcademicYearStudent: {
                    create: students.map( student => {
                        return {
                            studentId: student.id
                        };
                    } )
                }
            }
        } );

        res.status( 200 ).json( { message: "Berhasil Menambah Tahun Pelajaran" } );
    } catch ( error ) {
        next( error );
    }
};

export const index = async ( req, res, next ) => {
    try {
        const { active } = req.query;

        let where = {};

        if ( active ) where = { isActive: true };

        const academicYear = await prisma.academicYear.findMany( {
            where
        } );
        res.status( 200 ).json( { data: academicYear } );
    } catch ( error ) {
        next( error );
    }
};

export const activateAcademicYear = async ( req, res, next ) => {
    try {
        const { id } = req.params;

        await prisma.academicYear.updateMany( {
            where: {
                isActive: true
            },
            data: {
                isActive: false
            }
        } );

        const academicYear = await prisma.academicYear.update( {
            where: {
                id: parseInt( id )
            },
            data: {
                isActive: true
            }
        } );

        res.status( 200 ).json( { message: "Berhasil Mengaktifkan Tahun Pelajaran" } );
    } catch ( error ) {
        next( error );
    }
};