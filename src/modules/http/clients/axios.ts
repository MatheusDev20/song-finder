import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpClient, RequestDetails } from 'src/@types';
import { AUTH_PROVIDER, AXIOS_OPTIONS } from '../injection-tokens';
import { SpotfyAuthProvider } from 'src/modules/spotfy/spotfy.auth';

export type InstanceParams = {
  baseUrl: string;
  requireAuth: boolean;
  authClass: typeof SpotfyAuthProvider;
};

@Injectable()
export class AxiosClient implements HttpClient {
  private instance: AxiosInstance;
  private requireAuth: boolean;

  constructor(
    @Inject(AXIOS_OPTIONS) private options: InstanceParams,
    @Inject(AUTH_PROVIDER) private authProvider,
  ) {
    this.instance = axios.create({
      baseURL: options.baseUrl,
    });
    this.requireAuth = options.requireAuth;
  }

  async GET(details: RequestDetails) {
    const options = { ...details };
    if (this.requireAuth) {
      const authHeaders = await this.authProvider.getAuthHeaders();

      options.headers = authHeaders;
    }

    return this.instance.get(details.path, { headers: options.headers });
  }
}
