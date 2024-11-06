import { FireExternalRequest } from '../http/fire-request';

export class SpotfyProvider {
  constructor(private fireRequestProvider: FireExternalRequest) {}

  async getSongDetails() {
    this.fireRequestProvider.fire({ path: '/song-details' });
  }
}
