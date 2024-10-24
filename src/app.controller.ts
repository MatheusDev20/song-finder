import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PromptProvider } from './modules/prompt/prompt.provider';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prompt: PromptProvider,
  ) {}

  @Get()
  getHello(): string {
    this.prompt.respond();
    return this.appService.getHello();
  }
}
