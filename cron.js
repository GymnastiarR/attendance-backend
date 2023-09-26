import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const task = cron.schedule( '10 21 * * *', async () => {
    try {
        const kelas = await prisma.kelas.findMany( {
            where: {
                TahunPelajaran: {
                    isActive: true
                }
            }
        } );

        for await ( const i of kelas ) {
            const siswa = await prisma.siswa.findMany( {
                where: {
                    SiswaKelas: {
                        every: {
                            idKelas: i.id
                        }
                    }
                }
            } );

            await prisma.presensi.create( {
                data: {
                    idKelas: i.id,
                    Date: new Date(),
                    PresensiSiswa: {
                        createMany: {
                            data: siswa.map( ( item ) => {
                                return { idSiswa: item.id };
                            } )
                        }
                    }
                }
            } );
        }
    } catch ( error ) {
        console.log( error );
    }
    console.log( 'running a task every minute' );
}, {
    scheduled: true,
    timezone: "Asia/Jakarta"
} );

export default task;