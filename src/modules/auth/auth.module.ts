import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from '../user/user.module';
import { JwtConfigModule } from './jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from 'src/utilities/password.service';
import { HttpHelper } from 'src/helper/http.helper';
import { JwtAuthService } from './jwt/jwt.service';
import { PostgresProvider } from 'src/database/postgres/postgres.provider';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        global: true,
        secret: process.env.JWT_SECRET, // Use your secret key from environment variables
        signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
      }),
    }),
    UserModule,
  ],
  providers: [JwtAuthService, AuthService, PasswordService, HttpHelper, PostgresProvider],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
