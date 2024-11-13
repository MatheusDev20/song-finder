import { Controller, Get, Query } from '@nestjs/common';
import { TMDBProvider } from './tmdb.provider';
import { GetMovieDetailsDTO } from './inputs';
import { ok } from 'src/shared/http/common-responses';

@Controller('movie')
export class TMDBController {
  constructor(private provider: TMDBProvider) {}

  @Get('/')
  async movieDetails(@Query() query: GetMovieDetailsDTO) {
    const res = await this.provider.getMovieDetails({
      movieName: query.movieName,
    });
    return ok(res.data);
  }
}
