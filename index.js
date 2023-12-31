import app from './server.js';
import env from 'dotenv';
import task from './cron.js';

// app.get( '/rfid/:id/assign', ( req, res, next ) => {
//     io.emit( 'RFID', req.params.id );
//     res.status( 200 ).json( { message: "Hello World" } );
// } );

env.config();

app.listen( process.env.PORT, () => {
    console.log( "Server is running on port " + process.env.PORT + "." );
} );
