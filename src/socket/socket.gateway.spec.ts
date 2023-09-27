import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SocketModule } from './socket.module';
import { createServer } from 'http'; // Import 'http' from Node.js

import { Server } from 'socket.io';
import { io as socketIOClient } from 'socket.io-client';


// Create an HTTP server and attach Socket.io
const httpServer = createServer();
const io = new Server(httpServer);

// Mock a Socket.io namespace or room for testing
const namespace = io.of('/chat'); // Use the same namespace as in your application

describe('SocketGateway', () => {
    let app: INestApplication;
    let server: any;

    beforeAll(async () => {
        // Start the HTTP server
        await new Promise<void>((resolve) => {
            httpServer.listen(3000, () => {
                console.log('HTTP server started');
                resolve();
            });
        });

        const module: TestingModule = await Test.createTestingModule({
            imports: [SocketModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        // Close the HTTP server and Nest.js app
        await app.close();
        await new Promise<void>((resolve) => {
            httpServer.close(() => {
                console.log('HTTP server closed');
                resolve();
            });
        });
    });

    it('should connect to WebSocket server', (done) => {
        // Simulate WebSocket connection using socket.io-client
        const socket = socketIOClient('http://localhost:3000/chat'); // Connect to the '/chat' namespace
        socket.on('connect', () => {
            socket.disconnect();
            done();
        });
    });
});