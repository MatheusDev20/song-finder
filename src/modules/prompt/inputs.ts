import { IsIn, IsNotEmpty, MaxLength } from 'class-validator';

export class PromptInputDTO {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @MaxLength(20)
  @IsIn(['music', 'movies'])
  type: string;
}
