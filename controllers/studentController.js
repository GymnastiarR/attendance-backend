import { PrismaClient } from "@prisma/client";
import { query } from "express";

const prisma = new PrismaClient();
export const store = async ( req, res, next ) => {
    try {

        const { name, classId, nis, rfid } = req.body;

        let data = {
            name, nis
        };

        if ( classId !== '0' ) {
            data.ClassStudent = {
                create: {
                    classId
                }
            };
        }

        const student = await prisma.student.create( {
            data: data
        } );

        res.status( 200 ).json( { status: "Siswa Berhasil Ditambahkan", data: student } );

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

        const student = await prisma.student.findUnique( {
            where: {
                id: parseInt( id )
            }
        } );
        res.status( 200 ).json( { data: student } );
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
                isGraduated: false,
                ...query
            },
            // select: {
            //     nama: true,
            //     nis: true,
            //     id: true,
            //     SiswaKelas: true
            // }
            include: {
                ClassStudent: {
                    where: {
                        Class: {
                            academicYearId: academicYearId
                        }
                    },
                    select: {
                        Class: {
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
                ClassStudent: {
                    create: {
                        classId: parseInt( classId )
                    }
                }
            }
        } );
        res.status( 200 ).json( { status: "Berhasil", data: student } );
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

        if ( isExist ) throw new Error( "RFID Sudah Digunakan" );
        const student = await prisma.student.update( {
            where: {
                id: parseInt( id )
            },
            data: {
                rfid
            }
        } );
        res.status( 200 ).json( { status: "Berhasil", data: student } );
    } catch ( error ) {
        next( error );
    }
};

const getSiswaTanpaKelas = function ( academicYearId, query ) {
    return prisma.student.findMany( {
        where: {
            isGraduated: false,
            AND: [
                {
                    OR: [
                        {
                            ClassStudent: {
                                none: {}
                            }
                        },
                        {
                            ClassStudent: {
                                none: {
                                    Class: {
                                        academicYearId
                                    }
                                }
                            }
                        }
                    ]
                },
                query
            ]
        },
    } );
};