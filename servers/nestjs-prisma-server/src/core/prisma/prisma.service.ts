// https://stackoverflow.com/questions/69581717/where-is-the-beest-place-to-put-prisma-middleware-on-nestjs
// https://stackoverflow.com/questions/68300141/how-we-can-add-prisma-middleware-in-different-file
// https://www.prisma.io/docs/concepts/components/prisma-client/middleware/logging-middleware
import { INestApplication, Injectable, Optional } from '@nestjs/common';
// import { Prisma, PrismaClient } from '@prisma/client';
import { onDeleteArgs, PrismaDelete } from "@paljs/plugins";
import { PrismaService as NestjsPrismaService } from "nestjs-prisma";

@Injectable()
export class PrismaService extends NestjsPrismaService {

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this);
    await prismaDelete.onDelete(args);
  }
}
