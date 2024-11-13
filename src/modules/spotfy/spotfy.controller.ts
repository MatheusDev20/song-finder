import { Controller, Get, Query } from '@nestjs/common';
import { ok } from 'src/shared/http/common-responses';
import { SpotfyProvider } from './spotfy.provider';
import { GetSongDetailsInput } from './inputs';

@Controller('song')
export class SongController {
  constructor(private provider: SpotfyProvider) {}

  @Get('/')
  async handle(@Query() { songName, artistName }: GetSongDetailsInput) {
    const res = await this.provider.getSongDetails({ songName, artistName });
    return ok(res.data);
  }
}
