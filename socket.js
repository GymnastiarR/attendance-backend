import { Server } from 'socket.io';

class Socket {
    static getSocket( server ) {
        if ( this.io === undefined ) {
            this.io = new Server( server, {
                cors: "*"
            } );
            console.log( "Socket.io is running" );
        }
        console.log( "Socket.io is already running" );
        return this.io;
    }
}

export default Socket;