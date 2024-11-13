import { Module } from '@nestjs/common';
import { PromptModule } from './modules/prompt/prompt.module';
import { ConfigModule } from '@nestjs/config';
import { SpotfyModule } from './modules/spotfy/spotfy.module';
import { CacheModule } from '@nestjs/cache-manager';
import { TMDBModule } from './modules/tmdb/tmdb.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    PromptModule,
    SpotfyModule,
    TMDBModule,
  ],
})
export class AppModule {}
