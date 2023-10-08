import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { GoogleStrategy } from './google-auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
    }),
  ],
  providers: [GoogleAuthService, JwtStrategy, GoogleStrategy],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule { }