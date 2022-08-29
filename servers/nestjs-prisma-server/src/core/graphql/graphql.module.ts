import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule as NestjsGraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '../config';
import { GraphQLConfigService } from "./graphql-config.service";

@Module({
  imports: [
    NestjsGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLConfigService,
      imports: [ConfigModule],
    }),
  ],
})
export class GraphQLModule {}
