import { PrismaClient } from "@prisma/client";
import CustomError from "../custom/CustomError.js";

const prisma = new PrismaClient();

export const index = async ( req, res, next ) => {
    try {
        const stores = await prisma.store.findMany( {
            where: {
                deleted: false
            }
        } );

        res.status( 200 ).json( {
            message: "Berhasil mendapatkan semua toko",
            data: stores
        } );

    } catch ( error ) {
        next( error );
    }
};

export const store = async ( req, res, next ) => {
    try {
        const { name } = req.body;

        await prisma.store.create( {
            data: {
                name: name,
            }
        } );

        res.status( 201 ).json( {
            message: "Berhasil menambahkan toko baru",
        } );
    } catch ( error ) {
        next( error );
    }
};

export const show = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const shop = await prisma.store.findUnique( {
            where: {
                id: parseInt( id )
            },
            include: {
                Transaction: true
            }
        } );

        if ( !shop ) throw new Error( 'Toko tidak ditemukan' );

        const sum = await prisma.transaction.groupBy( {
            by: [ 'isPaid' ],
            where: {
                storeId: shop.id
            },
            _sum: {
                totalAmount: true
            }
        } );

        res.status( 200 ).json( {
            message: "Berhasil mendapatkan toko",
            data: { ...shop, sum: sum }
        } );
    } catch ( error ) {
        next( error );
    }
};

export const getHistories = async ( req, res, next ) => {
    try {
        const { id } = req.params;

        const canteen = await prisma.store.findUnique( {
            where: {
                id: parseInt( id )
            },
            include: {
                Transaction: {
                    include: {
                        DetailTransaction: true
                    }
                }
            }
        } );

        if ( !canteen ) throw new Error( 'Toko tidak ditemukan' );

        const histories = canteen.Transaction;

        res.status( 200 ).json( { data: histories } );
    } catch ( error ) {
        next( error );
    }
};

export const withdrawal = async ( req, res, next ) => {
    try {
        const { id } = req.params;

        await prisma.transaction.updateMany( {
            where: {
                storeId: parseInt( id ),
                isPaid: false
            },
            data: {
                isPaid: true
            }
        } );

        res.status( 200 ).json( { message: "Berhasil mencairkan" } );
    } catch ( error ) {
        next( error );
    }
};

export const destroy = async ( req, res, next ) => {
    try {
        const { id } = req.params;

        await prisma.store.update( {
            where: {
                id: parseInt( id )
            },
            data: {
                deleted: true
            }
        } );

        res.status( 200 ).json( {
            message: "Berhasil menghapus toko",
        } );

    } catch ( error ) {
        next( error );
    }
};