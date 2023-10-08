import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService {
    constructor(private readonly configService: ConfigService) { }

    get host(): string {
        return this.configService.get<string>('REDIS_HOST', 'localhost');
    }

    get port(): number {
        return this.configService.get<number>('REDIS_PORT', 6379);
    }
}