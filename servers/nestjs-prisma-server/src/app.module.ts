import { Module } from '@nestjs/common';
import { AppController, AppResolver, AppService } from './app';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}

