import { Body, Controller, Post } from '@nestjs/common';
import { PromptInputDTO } from './inputs';
import { PromptProvider } from './prompt.provider';
import { ok } from 'src/shared/http/common-responses';
import { SongRecomendationCompletion } from 'src/@types';

@Controller('prompt')
export class PromptController {
  constructor(private provider: PromptProvider) {}

  @Post()
  async handleSongCompletion(@Body() data: PromptInputDTO) {
    const { content } = data;

    const responseBody =
      await this.provider.respond<SongRecomendationCompletion>(content);

    return ok(responseBody);
  }
}
