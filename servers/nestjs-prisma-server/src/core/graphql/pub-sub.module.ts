import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import {PubSub} from "graphql-subscriptions";
// import { RedisPubSub } from 'graphql-redis-subscriptions';

// https://wanago.io/2021/02/15/api-nestjs-real-time-graphql-subscriptions/
// https://www.youtube.com/watch?v=yXdJGR-gLAQ&ab_channel=%5Bk%5Dcode
export const PUB_SUB = 'PUB_SUB';


@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
      // useFactory: (configService: ConfigService) => new RedisPubSub({
      //   connection: {
      //     host: configService.get('REDIS_HOST'),
      //     port: configService.get('REDIS_PORT'),
      //   }
      // }),
      // inject: [ConfigService]
    }
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
