import { AuthProvider } from 'src/@types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TmdbAuthProvider implements AuthProvider {
  constructor() {}

  async getAuthHeaders() {
    return {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    };
  }
}
