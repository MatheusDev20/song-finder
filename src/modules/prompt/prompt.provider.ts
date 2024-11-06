import { Injectable } from '@nestjs/common';
import { OpenAIProvider } from 'src/modules/openai/openai.provider';

@Injectable()
export class PromptProvider {
  constructor(private LLMProvider: OpenAIProvider) {}

  async respond<T>(content: string): Promise<T> {
    const completion = await this.LLMProvider.complete<T>(content);
    return completion;
  }
}
