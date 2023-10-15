// kafka.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Kafka, Producer, Consumer, logLevel, KafkaMessage } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private readonly logger = new Logger(KafkaService.name);

  constructor() {
    this.kafka = new Kafka({
      clientId: 'api',
      brokers: ['localhost:9092'], // Replace with your Kafka broker(s) address
      logLevel: logLevel.ERROR, // Adjust log level as needed
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'api-service-group' }); // Replace with your consumer group ID
  }

  async connect() {
    try {
      await this.producer.connect();
      console.log('Kafka producer connected');
      await this.consumer.connect();
      console.log('Kafka consumer connected');
    } catch (error) {
      console.error('Error connecting ot kafka:', error);
      throw error;
    }
    this.logger.log('Kafka connected');
  }

  async diconnect() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
    this.logger.log('Kafka disconnected');
  }

  async send(topic: string, messages: any[]) {
    try {
      await this.producer.send({
        topic,
        messages: messages.map((message) => ({
          key: null,
          value: JSON.stringify(message),
        })),
      });
    } catch (error) {
      console.error('Error producing message to Kafka:', error);
      throw error; // Rethrow the error to handle it in your controller or service.
    }
  }

  async subscribe(topic: string, callback: (message: KafkaMessage) => void) {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        callback(JSON.parse(message.value.toString()));
      },
    });
  }
}
