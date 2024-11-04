import { Body, Controller, Post } from '@nestjs/common';
import { PromptInputDTO } from './inputs';
import { PromptProvider } from './prompt.provider';
import { ok } from 'src/shared/http/common-responses';

@Controller('prompt')
export class PromptController {
  constructor(private provider: PromptProvider) {}
  @Post()
  async handle(@Body() data: PromptInputDTO) {
    const { content } = data;
    const responseBody = await this.provider.respond(content);

    return ok(responseBody);
  }
}
