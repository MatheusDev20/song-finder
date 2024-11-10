import { Injectable } from '@nestjs/common';
import { assistants, Behaviour } from './models';

@Injectable()
export class ModelBehaviour {
  async selectAssistant(
    name: string,
    recomendationType: string,
  ): Promise<Behaviour> {
    const selected = assistants.find(
      (assistant) => assistant[recomendationType].name === name,
    );
    if (!selected) throw new Error('Assistant not found');

    return selected[recomendationType];
  }
}
