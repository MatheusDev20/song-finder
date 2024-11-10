import { Injectable } from '@nestjs/common';
import { CompletionsCategories } from 'src/@types';
import { OpenAIProvider } from 'src/modules/openai/openai.provider';

type Input = {
  content: string;
  recomendationType: keyof CompletionsCategories;
};
@Injectable()
export class PromptProvider {
  constructor(private LLMProvider: OpenAIProvider) {}

  async respond<T>({ content, recomendationType }: Input): Promise<T> {
    const completion = await this.LLMProvider.complete<T>(
      content,
      recomendationType,
    );
    return completion;
  }
}
