import { Injectable } from '@nestjs/common';
import { OpenAIProvider } from 'src/modules/openai/openai.provider';

@Injectable()
export class PromptProvider {
  constructor(private LLMProvider: OpenAIProvider) {}

  async respond(content: string) {
    const completion = await this.LLMProvider.complete(content);
    return completion;
  }
}
