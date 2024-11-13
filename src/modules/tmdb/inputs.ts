import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetMovieDetailsDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  movieName: string;
}
