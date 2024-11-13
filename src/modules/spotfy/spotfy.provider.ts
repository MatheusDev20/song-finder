import { Injectable } from '@nestjs/common';
import { FireExternalRequest } from '../http/fire-request';
import { songDetailsParser } from './outputs';
import { SongDetailsDTO } from 'src/@types';

type ProviderInput = {
  songName: string;
  artistName: string;
};
type ProviderOutput<T> = {
  data: T;
};

@Injectable()
export class SpotfyProvider {
  constructor(private fireRequestProvider: FireExternalRequest) {}

  async getSongDetails({
    songName,
    artistName,
  }: ProviderInput): Promise<ProviderOutput<SongDetailsDTO>> {
    const path = '/search';
    const queryParams = {
      q: `track:${songName} artist:${artistName}`,
      type: 'track',
      limit: '1',
    };

    const response = await this.fireRequestProvider.fire({
      path: path,
      queryParams,
    });

    console.log('Res', response.tracks);

    return { data: songDetailsParser(response) };
  }
}
