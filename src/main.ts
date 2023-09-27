import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as webPush from 'web-push';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Env variables
  const port = process.env.APP_PORT || 3002

  // Configure CORS options
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Replace with the allowed origin(s) of your frontend app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (e.g., cookies) to be sent with requests
  };

  // Enable CORS for your application
  app.enableCors(corsOptions);

  // Configure VAPID keys for web-push
  const vapidKeys = {
    publicKey: 'your-public-key',
    privateKey: 'your-private-key',
  };
  // webPush.setVapidDetails(
  //   'http://localhost:3000', // app url
  //   vapidKeys.publicKey,
  //   vapidKeys.privateKey
  // );

  await app.listen(port, () => {
    try {
      console.log("Service running on port " + port)
    } catch (error) {
      console.log(error)
    }
  });
}
bootstrap();
