import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { GraphQLModule } from "./graphql";

@Module({
  imports: [
    ConfigModule,
    GraphQLModule,
  ],
  controllers: [],
  providers: [],
  exports: [
    // ConfigModule,
    // GraphQLModule,
  ],
})
export class CoreModule {}
