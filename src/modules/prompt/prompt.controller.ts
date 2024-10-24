import { Body, Controller, Post } from '@nestjs/common';
import { PromptInputDTO } from './inputs';

@Controller('prompt')
export class PromptController {
  @Post()
  async handle(@Body() data: PromptInputDTO) {
    console.log('Handle Request', data);

    return {};
  }
}
