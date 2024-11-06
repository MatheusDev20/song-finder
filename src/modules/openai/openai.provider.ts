import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ModelBehaviour } from './assistants/provider';
import { zodResponseFormat } from 'openai/helpers/zod';

import {
  ChatCompletionMessageParam,
  ChatCompletionSystemMessageParam,
} from 'openai/resources';
import { StructuredData } from './schemas';
import { CustomLogger } from '../logger/logger.provider';

@Injectable()
class OpenAIProvider {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(
    private assistant: ModelBehaviour,
    private logger: CustomLogger,
  ) {
    this.client = new OpenAI();
    this.model = process.env.MODEL;
  }

  async complete<T>(content: string): Promise<T> {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: await this.formatMessages(content),
      response_format: zodResponseFormat(StructuredData, 'songs'),
    });

    const [response] = completion.choices;
    const parsed = JSON.parse(response.message.content);
    this.logger.generatedCompletion(parsed);

    return parsed;
  }

  private formatMessages = async (
    content: string,
  ): Promise<ChatCompletionMessageParam[]> => {
    const behaviour = await this.assistant.selectAssistant('Morrisey');
    const actSystem = {
      role: 'system',
      content: [
        {
          type: 'text',
          text: behaviour.instructions,
        },
      ],
    } as ChatCompletionSystemMessageParam;

    return [
      actSystem,
      { role: 'user', content: [{ type: 'text', text: content }] },
    ];
  };
}

export { OpenAIProvider };
