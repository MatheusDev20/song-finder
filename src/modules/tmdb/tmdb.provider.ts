import { MovieDTO } from './../../@types/index';
import { Injectable } from '@nestjs/common';
import { FireExternalRequest } from '../http/fire-request';
import { movieDetailsParser } from './outputs';

type Input = {
  movieName: string;
};

type ProviderOutput<T> = {
  data: T;
};

@Injectable()
export class TMDBProvider {
  constructor(private fireRequestProvider: FireExternalRequest) {}

  async getMovieDetails({
    movieName,
  }: Input): Promise<ProviderOutput<MovieDTO>> {
    const path = '/search/movie';
    const queryParams = {
      query: movieName,
    };
    const response = await this.fireRequestProvider.fire({ path, queryParams });

    return { data: movieDetailsParser(response) };
  }
}
