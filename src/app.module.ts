import { Module } from '@nestjs/common';
import { PromptModule } from './modules/prompt/prompt.module';
import { ConfigModule } from '@nestjs/config';
import { SpotfyModule } from './modules/spotfy/spotfy.module';

@Module({
  imports: [ConfigModule.forRoot(), PromptModule, SpotfyModule],
})
export class AppModule {}
