import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const buy = async ( req, res, next ) => {
    try {
        const { products } = req.body;
        const { rfid } = req.body;
        const { canteenId } = req.params;

        const { id: rfidId, balance } = await prisma.rfid.findUnique( {
            where: {
                rfid: rfid
            }
        } );

        if ( !rfidId ) throw new Error( "RFID tidak ditemukan" );


        const store = await prisma.store.findUnique( {
            where: {
                id: parseInt( canteenId )
            }
        } );

        if ( !store ) throw new Error( 'Kantin tidak ditemukan' );

        const detailedProducts = await prisma.menu.findMany( {
            where: {
                storeId: store.id
            },
            select: {
                id: true,
                name: true,
                Price: {
                    select: {
                        id: true,
                        price: true
                    },
                    take: 1,
                    orderBy: {
                        id: "desc"
                    }
                }
            }
        } );

        let totalAmount = 0;
        const detailedTransactions = products.map( product => {
            const detailProduct = detailedProducts.find( detail => detail.id === product.id );

            if ( !detailProduct ) throw new Error( 'Menu tidak ditemukan' );

            const priceId = detailProduct.Price[ 0 ].id;

            const menuId = product.id;

            const qty = product.qty;

            const subTotal = qty * detailProduct.Price[ 0 ].price;

            totalAmount += subTotal;

            return { priceId, menuId, qty, subTotal };
        } );

        if ( balance < totalAmount ) {
            return res.status( 200 ).json( { message: "Saldo Kurang" } );
        }

        const newBalance = balance - totalAmount;

        await prisma.$transaction( [
            prisma.rfid.update( {
                where: {
                    id: rfidId
                },
                data: {
                    balance: newBalance
                }
            } ),
            prisma.transaction.create( {
                data: {
                    storeId: 1,
                    totalAmount,
                    DetailTransaction: {
                        create: detailedTransactions
                    },
                    rfidId
                }
            } )

        ] );

        res.status( 200 ).json( { message: `Transaksi Berhasil. Total Transaksi : ${totalAmount}` } );
    } catch ( error ) {
        next( error );
    }
};

export const customPrice = async ( req, res, next ) => {
    try {
        const { canteenId } = req.params;
        const { price, rfid } = req.body;

        const { id: rfidId, balance } = await prisma.rfid.findUnique( {
            where: {
                rfid: rfid
            }
        } );

        if ( !rfidId ) throw new Error( "RFID tidak ditemukan" );

        const store = await prisma.store.findUnique( {
            where: {
                id: parseInt( canteenId )
            }
        } );

        if ( !store ) throw new Error( 'Kantin tidak ditemukan' );

        const newBalance = balance - price;

        if ( balance < price ) {
            return res.status( 200 ).json( { message: "Saldo Kurang" } );
        }

        await prisma.$transaction( [
            prisma.rfid.update( {
                where: {
                    id: rfidId
                },
                data: {
                    balance: newBalance
                }
            } ),
            prisma.transaction.create( {
                data: {
                    storeId: 1,
                    totalAmount: price,
                    rfidId: rfidId,
                }
            } )

        ] );

        res.status( 200 ).json( { message: "Transaksi Berhasil" } );
    } catch ( error ) {
        next( error );
    }
};

export const withdrawal = async ( req, res, next ) => {
    try {

    } catch ( error ) {
        next( error );
    }
};