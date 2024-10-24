import { IsNotEmpty } from 'class-validator';

export class PromptInputDTO {
  @IsNotEmpty()
  content: string;
}
