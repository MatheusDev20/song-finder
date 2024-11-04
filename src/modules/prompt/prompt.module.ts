import { Module } from '@nestjs/common';
import { OpenAIModule } from '../openai/openai.module';
import { PromptProvider } from './prompt.provider';
import { PromptController } from './prompt.controller';

@Module({
  imports: [OpenAIModule],
  providers: [PromptProvider],
  controllers: [PromptController],
  exports: [PromptProvider],
})
export class PromptModule {}
