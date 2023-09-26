import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const storeRuangKelas = async ( req, res, next ) => {
    try {
        const { nama } = req.body;
        const ruangan = await prisma.ruangKelas.create( {
            data: {
                nama
            }
        } );
        res.status( 200 ).json( { status: "Ruangan Berhasil Ditambahkan", data: ruangan } );
    } catch ( error ) {
        next( error );
    }
};

export const getAllRuangKelas = async ( req, res, next ) => {
    try {
        const ruanganKelas = await prisma.ruangKelas.findMany();
        res.status( 200 ).json( { data: ruanganKelas } );
    } catch ( error ) {
        next( error );
    }
};

const updateRuangKelas = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const { nama } = req.body;
        const ruanganKelas = await prisma.ruangKelas.update( {
            where: {
                id: parseInt( id )
            },
            data: {
                nama: nama
            }
        } );
        res.status( 200 ).json( { status: "Ruangan Berhasil Diupdate" } );
    } catch ( error ) {
        next( error );
    }
};