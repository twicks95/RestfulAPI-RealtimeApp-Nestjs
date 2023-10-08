import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisConfigService } from './redis-config.service';
import { RedisModule } from 'nestjs-redis';

@Module({
    imports: [ConfigModule, RedisModule.register({
        host: 'localhost', // Redis server host (can be IP or hostname)
        port: 6379, // Redis server port
    })],
    providers: [RedisConfigService],
    exports: [RedisModule],
})
export class RedisCacheModule { }