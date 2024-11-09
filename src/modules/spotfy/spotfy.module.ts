import { Module } from '@nestjs/common';
import { SongController } from './spotfy.controller';
import { SpotfyAuthProvider } from './spotfy.auth';
import { LoggerModule } from '../logger/logger.module';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '../http/http.module';

@Module({
  controllers: [SongController],
  imports: [
    CacheModule.register(),
    HttpModule.register({
      baseUrl: process.env.SPOTFY_SERVICE_URL,
      authClass: SpotfyAuthProvider,
      requireAuth: true,
    }),
    LoggerModule,
  ],
  providers: [SpotfyAuthProvider],
  exports: [SpotfyAuthProvider],
})
export class SpotfyModule {}
