import { Module } from '@nestjs/common';
import { PromptModule } from './modules/prompt/prompt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PromptModule],
})
export class AppModule {}
