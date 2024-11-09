import { Module } from '@nestjs/common';
import { PromptModule } from './modules/prompt/prompt.module';
import { ConfigModule } from '@nestjs/config';
import { SpotfyModule } from './modules/spotfy/spotfy.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    PromptModule,
    SpotfyModule,
  ],
})
export class AppModule {}
