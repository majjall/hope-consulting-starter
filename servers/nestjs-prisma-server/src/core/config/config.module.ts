import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configuration } from './configuration';
// import { validationSchema } from './validation';


@Module({
  imports: [
    NestConfigModule.forRoot({
      // envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`, // ['.env'],
      isGlobal: true,
      load: [configuration],
      // validationSchema,
    }),
  ],
})
export class ConfigModule {}
