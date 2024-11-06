import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpClient, RequestDetails } from 'src/@types';
import { AXIOS_OPTIONS } from '../injection-tokens';

type InstanceParams = {
  baseUrl: string;
};

@Injectable()
export class AxiosClient implements HttpClient {
  private instance: AxiosInstance;

  constructor(@Inject(AXIOS_OPTIONS) private options: InstanceParams) {
    const { baseUrl } = options;
    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  async GET(details: RequestDetails) {
    return this.instance.get(details.path);
  }
}
