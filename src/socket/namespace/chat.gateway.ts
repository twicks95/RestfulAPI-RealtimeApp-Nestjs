// socket/chat.gateway.ts

import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Namespace, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/chat' }) // Specify the namespace as '/chat'
export class ChatGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('chatMessage')
  handleMessage(client: Socket, payload: any) {
    // Handle chat messages in the '/chat' namespace
    this.server.emit('chatMessage', payload);
  }
}
