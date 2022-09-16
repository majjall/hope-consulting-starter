import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { PrismaModule } from "./prisma";
import { GraphQLModule } from "./graphql";

const MODULES: any[] = [
  ConfigModule,
  PrismaModule,
  GraphQLModule,
];


@Module({
  imports: [
    ...MODULES,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
