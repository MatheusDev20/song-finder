import { Module } from '@nestjs/common';
import { OpenAIProvider } from './openai.provider';
import { ModelBehaviour } from './assistants/provider';

@Module({
  exports: [OpenAIProvider],
  providers: [OpenAIProvider, ModelBehaviour],
})
export class OpenAIModule {}
