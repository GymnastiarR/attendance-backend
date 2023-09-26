import express from 'express';
import cors from 'cors';
import router from './router/index.js';
import http from 'http';
import Socket from './socket.js';

const app = express();
const server = http.createServer( app );
Socket.getSocket( server );

app.use( express.json() );
app.use( cors() );
app.use( '/api', router() );
// app.use( express.static( __dirname + '/public' ) );

export default server;