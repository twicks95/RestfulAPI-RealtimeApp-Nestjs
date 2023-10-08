import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PushNotificationModule } from './push-notification/push-notification.module';

// include SocketModule
import { SocketModule } from './socket/socket.module'; // Import your SocketModule
import { UserModule } from './modules/user/user.module';
import { GoogleAuthModule } from './modules/auth/google-auth/google-auth.module';
import { GoogleAuthController } from './modules/auth/google-auth/google-auth.controller';
import { RedisCacheModule } from './database/redis/redis.module';
import { PostgresProvider } from './database/postgres/postgres.provider';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './modules/auth/jwt/jwt.strategy';
import { JwtConfigModule } from './modules/auth/jwt/jwt.module';
import { HttpHelper } from './helper/http.helper';
import { AppRunner } from './app.runner';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler/scheduler.service';

@Module({
  imports: [ConfigModule.forRoot(), PushNotificationModule, ScheduleModule.forRoot(), JwtConfigModule, AuthModule, UserModule], // Import other modules here
  controllers: [AppController], // Include controllers here
  providers: [AppService, AppRunner, SchedulerService], // Include providers here
})
export class AppModule { }
