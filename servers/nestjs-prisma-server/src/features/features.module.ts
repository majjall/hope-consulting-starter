import { Module } from '@nestjs/common';
import { SampleModule } from "./sample";


@Module({
  imports: [
    SampleModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class FeaturesModule {}
