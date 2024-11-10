import { Injectable } from '@nestjs/common';
import { FireExternalRequest } from '../http/fire-request';

type ProviderInput = {
  songName: string;
  artistName: string;
};
type ProviderOutput = {
  data: any;
};

@Injectable()
export class SpotfyProvider {
  constructor(private fireRequestProvider: FireExternalRequest) {}
  async getSongDetails({
    songName,
    artistName,
  }: ProviderInput): Promise<ProviderOutput> {
    const path = '/search';
    const queryParams = {
      q: `track:${songName}artist:${artistName}`,
      type: 'track',
    };

    const response = await this.fireRequestProvider.fire({
      path: path,
      queryParams,
    });
    console.log(response);

    return { data: response };
  }
}
