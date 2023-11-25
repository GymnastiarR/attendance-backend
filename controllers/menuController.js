import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends( {
    model: {
        menu: {
            async findMany( { model, operation, args, query } ) {

                args.where = { ...args.where, deleted: false };

                console.log( args );

                return query( args );
            },
        }
    }
} );
export const store = async ( req, res, next ) => {
    try {
        const { storeId } = req.params;
        const { name, price } = req.body;

        await prisma.menu.create( {
            data: {
                name: name,
                price: price,
                storeId: storeId
            }
        } );

        res.status( 201 ).json( {
            message: "Berhasil menambahkan menu baru",
        } );
    } catch ( error ) {
        next( error );
    }
};

export const updateName = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const result = await prisma.menu.update( {
            where: {
                id: parseInt( id )
            },
            data: {
                name: name
            }
        } );

        res.status( 200 ).json( {
            message: "Berhasil mengubah nama menu",
        } );

    } catch ( error ) {
        next( error );
    }
};

export const updatePrice = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const { price } = req.body;

        await prisma.menu.update( {
            where: {
                id: parseInt( id )
            },
            data: {
                Price: {
                    create: {
                        price: parseInt( price )
                    }
                }
            }
        } );

        res.status( 200 ).json( {
            message: "Berhasil mengubah harga menu",
        } );
    } catch ( error ) {
        next( error );
    }
};

export const destroy = async ( req, res, next ) => {
    try {
        const { id } = req.params;

        await prisma.menu.update( {
            where: {
                id: parseInt( id )
            },
            data: {
                deleted: true
            }
        } );

        res.status( 200 ).json( {
            message: "Berhasil menghapus menu",
        } );
    } catch ( error ) {
        next( error );
    }
};

export const update = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        // await prisma.$transaction([
        //     prisma.price.create({
        //         data : {
        //             price
        //         }
        //     })
        // ])

        await prisma.price.create( {
            data: {
                price: parseInt( price ),
                menuId: parseInt( id )
            }
        } );

        res.status( 200 ).json( {
            message: "Berhasil mengubah menu",
        } );

    } catch ( error ) {
        next( error );
    }
};