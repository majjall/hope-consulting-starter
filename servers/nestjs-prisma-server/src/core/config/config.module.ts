// https://docs.nestjs.com/techniques/configuration
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configuration } from './config';
// import { validationSchema } from './validation';


@Module({
  imports: [
    NestConfigModule.forRoot({
      // envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`, // ['.env'],
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
      // validationSchema,
    }),
  ],
})
export class ConfigModule {}
