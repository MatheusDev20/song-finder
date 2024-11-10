import { BadRequestException, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ModelBehaviour } from './assistants/provider';
import { zodResponseFormat } from 'openai/helpers/zod';

import {
  ChatCompletionMessageParam,
  ChatCompletionSystemMessageParam,
} from 'openai/resources';
import { StructuredData } from './schemas';
import { CustomLogger } from '../logger/logger.provider';
import { assistantResponsibleFor } from './assistants/models';

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

  async complete<T>(content: string, recomendationType: string): Promise<T> {
    const messages = await this.formatMessages(content, recomendationType);

    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages,
      response_format: zodResponseFormat(StructuredData, recomendationType),
    });

    const [response] = completion.choices;
    const parsed = JSON.parse(response.message.content);
    this.logger.generatedCompletion(parsed);

    return parsed;
  }

  private formatMessages = async (
    content: string,
    recomendationType: string,
  ): Promise<ChatCompletionMessageParam[]> => {
    const behaviour = await this.assistant.selectAssistant(
      assistantResponsibleFor[recomendationType],
      recomendationType,
    );

    if (!content.includes(recomendationType)) {
      throw new BadRequestException(
        'Prompt Content must contain the word of the recomendation type',
      );
    }

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
