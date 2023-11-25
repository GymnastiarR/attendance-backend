import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const users = {
            name: "Test",
            password: "test",
            email: "test@gmail.com",
        };

        await prisma.user.create( {
            data: users
        } );

        await prisma.academicYear.create( {
            data: {
                semester: "Genap",
                year: "2020/2021",
                isActive: true,
            }
        } );

        await prisma.major.create( {
            data: {
                name: "Teknik Informatika",
            }
        } );

        await prisma.year.create( {
            data: {
                name: "X"
            }
        } );

        await prisma.class.create( {
            data: {
                name: "A",
                majorId: 1,
                yearId: 1,
                academicYearId: 1,
            }
        } );

        await prisma.student.create( {
            data: {
                name: "Gymnastiar",
                nis: "2110511015",
                AcademicYearStudent: {
                    create: {
                        academicYearId: 1
                    }
                },
                ClassStudent: {
                    create: {
                        classId: 1
                    }
                }
            }
        } );

        await prisma.store.create( {
            data: {
                name: "Gymnas's Store",
                Menu: {
                    create: [
                        { name: "Ayam Geprek", Price: { create: { price: 16000 } } },
                        { name: "Ayam Goreng", Price: { create: { price: 17000 } } },
                    ]
                }
            }
        } );

    } catch ( error ) {
        console.log( error );
    }
}

main();

