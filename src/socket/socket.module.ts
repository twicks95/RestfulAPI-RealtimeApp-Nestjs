import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { ChatGateway } from './namespace/chat.gateway';

@Module({
  providers: [SocketGateway, ChatGateway],
})
export class SocketModule {}