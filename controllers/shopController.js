import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const index = async ( req, res, next ) => {
    try {
        const stores = await prisma.store.findMany( {
            where: {
                deleted: false
            },
            include: {
                _count: {
                    select: {
                        Menu: true
                    }
                }
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
        const { name, menus } = req.body;

        const preparedMenus = menus.map( menu => {
            return ( {
                name: menu.name,
                Price: {
                    create: {
                        price: parseInt( menu.price )

                    }
                }
            } );
        } );

        await prisma.store.create( {
            data: {
                name: name,
                Menu: {
                    create: preparedMenus
                }
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
                Menu: {
                    select: {
                        id: true,
                        name: true,
                        Price: {
                            take: 1,
                            orderBy: {
                                id: "desc"
                            }
                        }
                    },
                    where: {
                        deleted: false
                    }
                },
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

export const getMenus = async ( req, res, next ) => {
    try {
        const { storeId } = req.params;

        const menus = await prisma.menu.findMany( {
            where: {
                storeId: parseInt( storeId )
            }
        } );

        res.status( 200 ).json( {
            message: "Berhasil mendapatkan menu",
            data: menus
        } );
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