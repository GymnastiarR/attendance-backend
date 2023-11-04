import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const index = async ( req, res, next ) => {
    try {
        const stores = await prisma.store.findMany( {
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

        await prisma.store.create( {
            data: {
                name: name,
                Menu: {
                    create: menus.map( ( menu ) => ( { name: menu.name, price: parseInt( menu.price ) } ) )
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