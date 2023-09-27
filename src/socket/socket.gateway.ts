import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;

    // Event handler for when a client connects
    handleConnection(client: Socket) {
        // This method is called when a client connects to the WebSocket server
        console.log(`Client connected: ${client.id}`);
    }

    // Event handler for when a client disconnects
    handleDisconnect(client: Socket) {
        // This method is called when a client disconnects from the WebSocket server
        console.log(`Client disconnected: ${client.id}`);
    }

    // Event handler for custom WebSocket messages
    @SubscribeMessage('chatMessage')
    handleMessage(client: Socket, payload: any) {
        // Handle WebSocket messages here and broadcast them to other clients
        this.server.emit('chatMessage', payload);
    }
}