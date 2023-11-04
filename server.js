import express from 'express';
import cors from 'cors';
import router from './router/index.js';
import http from 'http';
import Socket from './socket.js';
import cookieParser from 'cookie-parser';
import env from 'dotenv/config.js';

const app = express();
const server = http.createServer( app );
Socket.getSocket( server );

app.use( express.json() );
app.use( cors() );
app.use( cookieParser( process.env.COOKIE_SECRET ) );
app.get( '/', ( req, res ) => {
    res.status( 200 ).json( { message: 'Hello World' } );
} );
app.use( '/api', router() );
// app.use( express.static( __dirname + '/public' ) );

export default server;