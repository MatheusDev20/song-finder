import { Controller, Get, Query } from '@nestjs/common';
import { ok } from 'src/shared/http/common-responses';
import { FireExternalRequest } from '../http/fire-request';

@Controller('song')
export class SongController {
  constructor(private provider: FireExternalRequest) {}
  @Get('/')
  async handle(@Query() songName: string) {
    console.log('Song Name', songName);
    await this.provider.fire({ path: '/song-details' });
    return ok({ message: 'Hello World' });
  }
}
