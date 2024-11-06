import { Module } from '@nestjs/common';
import { HttpModule } from '../http/http.module';
import { SongController } from './spotfy.controller';

@Module({
  providers: [],
  controllers: [SongController],
  imports: [HttpModule.register({ baseURL: 'https://api.spotify.com/v1' })],
  exports: [],
})
export class SpotfyModule {}
