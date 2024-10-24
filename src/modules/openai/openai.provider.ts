import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
class OpenAIProvider {
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI();
  }

  async create() {
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: 'Write a haiku about recursion in programming.',
        },
      ],
    });

    console.log(completion.choices[0]);
  }
}

export { OpenAIProvider };
