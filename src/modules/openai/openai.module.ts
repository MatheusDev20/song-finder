import { Module } from '@nestjs/common';
import { OpenAIProvider } from './openai.provider';

@Module({
  exports: [OpenAIProvider],
  providers: [OpenAIProvider],
})
export class OpenAIModule {}
