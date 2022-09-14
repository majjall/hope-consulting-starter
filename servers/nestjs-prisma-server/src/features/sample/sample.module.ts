import { Module } from '@nestjs/common';
import { SampleResolver } from "./sample.resolver";
import { SampleService } from "./sample.service";
import { SampleController } from "./sample.controller";

@Module({
  controllers: [SampleController],
  providers: [SampleResolver, SampleService]
})
export class SampleModule {}
