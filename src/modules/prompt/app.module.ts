import { Module } from '@nestjs/common';
import { OpenAIModule } from '../openai/openai.module';
import { PromptProvider } from './prompt.provider';

@Module({
  imports: [OpenAIModule],
  providers: [PromptProvider],
  exports: [PromptProvider],
})
export class PromptModule {}
