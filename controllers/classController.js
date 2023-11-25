import { PrismaClient } from "@prisma/client";

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
                                }
                            }
                        }
                    }
                }
            }
        } );
        res.status( 200 ).json( { data: clss } );
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
