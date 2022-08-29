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
  exports: [],
})
export class CoreModule {}
