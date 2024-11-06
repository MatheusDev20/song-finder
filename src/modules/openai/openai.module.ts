import { Module } from '@nestjs/common';
import { OpenAIProvider } from './openai.provider';
import { ModelBehaviour } from './assistants/provider';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  exports: [OpenAIProvider],
  providers: [OpenAIProvider, ModelBehaviour],
})
export class OpenAIModule {}
