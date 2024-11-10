import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetSongDetailsInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  songName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  artistName: string;
}
