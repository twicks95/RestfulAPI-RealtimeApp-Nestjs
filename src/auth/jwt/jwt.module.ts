import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: process.env.JWT_SECRET, // Use your secret key from environment variables
                signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
            }),
        }),
    ],
    exports: [JwtModule],
})
export class JwtConfigModule { }