import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ModelBehaviour } from './assistants/provider';
import { zodResponseFormat } from 'openai/helpers/zod';

import {
  ChatCompletionMessageParam,
  ChatCompletionSystemMessageParam,
} from 'openai/resources';
import { StructuredData } from './schemas';

@Injectable()
class OpenAIProvider {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(private assistant: ModelBehaviour) {
    this.client = new OpenAI();
    this.model = process.env.MODEL;
  }

  async complete(content: string) {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: await this.formatMessages(content),
      response_format: zodResponseFormat(StructuredData, 'songs'),
    });
    const [response] = completion.choices;
    return JSON.parse(response.message.content);
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
