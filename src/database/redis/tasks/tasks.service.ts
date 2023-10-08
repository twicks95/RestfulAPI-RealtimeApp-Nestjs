import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class TasksService {
    constructor(@InjectQueue('example-queue') private readonly exampleQueue: Queue) { }

    async addTask(data: any) {
        await this.exampleQueue.add('example-job', data);
    }
}