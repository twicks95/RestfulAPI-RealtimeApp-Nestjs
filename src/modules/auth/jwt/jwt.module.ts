import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        global: true,
        secret: process.env.JWT_SECRET, // Use your secret key from environment variables
        signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
      }),
    }),
    AuthModule,
  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class JwtConfigModule {}
