import { Module } from '@nestjs/common';
import { PrismaModule as NestjsPrismaModule, PrismaService as NestjsPrismaService } from 'nestjs-prisma';
import { PrismaConfigService } from "./prisma-config.service";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [
    NestjsPrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
  ],
  providers: [{ provide: NestjsPrismaService, useClass: PrismaService }],
  // exports: [PrismaService],
})
export class PrismaModule {}
