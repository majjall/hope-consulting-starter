import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule as NestjsGraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from "../prisma";
import { ConfigModule } from '../config';
import { GraphQLConfigService } from "./graphql-config.service";
import { PubSubModule } from "./pub-sub.module";

@Module({
  imports: [
    NestjsGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLConfigService,
      imports: [ConfigModule, PrismaModule],
    }),
    PubSubModule
  ],
})
export class GraphQLModule {}
