import { PrismaClient } from "@prisma/client";
import Socket from "../socket";

const prisma = new PrismaClient();

export const store = async ( req, res, next ) => {
    try {
        const { id: RFID } = req.params;
        const { token } = req.query;
        const io = Socket.getSocket();
        io.emit( "RFID", RFID );
        res.status( 200 ).json( { status: "OK" } );
    } catch ( error ) {
        next( error );
    }
};