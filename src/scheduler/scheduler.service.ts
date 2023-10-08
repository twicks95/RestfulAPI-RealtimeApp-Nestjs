import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  @Cron('45 * * * * *')
  handleCron() {
    console.log('Called every 45 seconds');
  }

  @Interval(1000)
  handleInterval1(){
    console.log('Run every 1 seconds')
  }
  @Cron(CronExpression.EVERY_30_MINUTES)
  handleCron2() {
    console.log('Called every 30 minutes');
  }

  @Interval(10000)
  handleInterval() {
    console.log('Called every 10 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    console.log('Called once after 5 seconds');
  }
}
