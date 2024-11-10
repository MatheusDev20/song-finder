import { Body, Controller, Post } from '@nestjs/common';
import { PromptInputDTO } from './inputs';
import { PromptProvider } from './prompt.provider';
import { ok } from 'src/shared/http/common-responses';
import { CompletionsCategories, RecomendationCompletion } from 'src/@types';

@Controller('prompt')
export class PromptController {
  constructor(private provider: PromptProvider) {}

  @Post()
  async handleCompletion(@Body() data: PromptInputDTO) {
    const { content, type } = data;

    const completionType = type as keyof CompletionsCategories;

    const responseBody = await this.provider.respond<
      RecomendationCompletion<
        Pick<CompletionsCategories, typeof completionType>
      >
    >({ content, recomendationType: completionType });

    return ok(responseBody);
  }
}
