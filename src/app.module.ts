import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PushNotificationModule } from './push-notification/push-notification.module';

// include SocketModule
import { SocketModule } from './socket/socket.module'; // Import your SocketModule
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { GoogleAuthController } from './google-auth/google-auth.controller';
import { RedisCacheModule } from './redis/redis.module';

@Module({
  imports: [ConfigModule.forRoot(), PushNotificationModule, SocketModule, RedisCacheModule, UserModule, GoogleAuthModule], // Import other modules here
  controllers: [AppController, UserController, GoogleAuthController], // Include controllers here
  providers: [AppService, UserService], // Include providers here
})
export class AppModule { }
