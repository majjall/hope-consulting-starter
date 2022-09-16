import { Injectable } from '@nestjs/common';
import { loggingMiddleware, PrismaOptionsFactory, PrismaServiceOptions } from 'nestjs-prisma';

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {

  // constructor(configService: ConfigService) {}
  constructor() {}

  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ['info', 'query'],
        // datasources: {
        //   db: {
        //     url: configService.get('DATABASE_URL'),
        //   },
        // },
      },
      explicitConnect: true,
      // configure your prisma middleware
      middlewares: [
        loggingMiddleware(),
        // ConcurrencyErrorMiddleware()
      ],
    };
  }
}
