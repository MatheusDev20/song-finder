import { Injectable } from '@nestjs/common';
import { assistants, Behaviour } from './models';

@Injectable()
export class ModelBehaviour {
  async selectAssistant(name: string): Promise<Behaviour> {
    const selected = assistants.find((assistant) => assistant.name === name);
    if (!selected) throw new Error('Assistant not found');

    return selected;
  }
}
