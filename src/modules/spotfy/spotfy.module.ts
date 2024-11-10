import { Module } from '@nestjs/common';
import { SongController } from './spotfy.controller';
import { SpotfyAuthProvider } from './spotfy.auth';
import { LoggerModule } from '../logger/logger.module';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '../http/http.module';
import { SpotfyProvider } from './spotfy.provider';

@Module({
  controllers: [SongController],
  imports: [
    CacheModule.register(),
    HttpModule.register({
      baseUrl: `https://api.spotify.com/v1`,
      authClass: SpotfyAuthProvider,
      requireAuth: true,
    }),
    LoggerModule,
  ],
  providers: [SpotfyAuthProvider, SpotfyProvider],
  exports: [SpotfyAuthProvider],
})
export class SpotfyModule {}
