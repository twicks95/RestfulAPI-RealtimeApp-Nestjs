import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { Subscription } from '../subcriptions/subscription.interface';

@Controller('push')
export class PushNotificationController {
  constructor(private readonly pushNotificationService: PushNotificationService) {}

  @Post('subscribe')
  subscribe(@Body() subscription: Subscription) {
    this.pushNotificationService.subscribe(subscription);
  }

  @Delete('unsubscribe/:endpoint')
  unsubscribe(@Param('endpoint') endpoint: string) {
    this.pushNotificationService.unsubscribe(endpoint);
  }
}