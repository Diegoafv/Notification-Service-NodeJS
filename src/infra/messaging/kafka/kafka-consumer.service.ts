import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['humble-swine-7564-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'aHVtYmxlLXN3aW5lLTc1NjQkxWqwcLmOx1BT7pN7gesVqtcy8qqR0GRLkaYfUa4',
          password:
            'Anx_JdY0yiYYopPjEUSnGVfPKRQ1xseHAJTuxf99WsJAWuaEq07tYUgAjrOiACPu_Cq0oA==',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
