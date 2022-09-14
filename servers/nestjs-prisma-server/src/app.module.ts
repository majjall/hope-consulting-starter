import { Module } from '@nestjs/common';
import { AppController, AppResolver, AppService } from './app';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from "./features/features.module";

@Module({
  imports: [
    CoreModule,
    FeaturesModule
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}

