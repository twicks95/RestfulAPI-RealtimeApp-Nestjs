import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { RedisConfigService } from '../redis-config.service';

@Module({
    imports: [
        BullModule.forRootAsync({
            useFactory: (redisConfigService: RedisConfigService) => ({
                redis: {
                    host: redisConfigService.host,
                    port: redisConfigService.port,
                },
            }),
            inject: [RedisConfigService],
        }),
    ],
})
export class RedisQueueModule { }