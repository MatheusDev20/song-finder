import { DynamicModule, Module } from '@nestjs/common';
import { FireExternalRequest } from './fire-request';
import { AxiosClient } from './clients/axios';
import { AXIOS_OPTIONS, HTTP_CLIENT } from './injection-tokens';

@Module({})
export class HttpModule {
  static register(options: any): DynamicModule {
    return {
      module: HttpModule,
      providers: [
        FireExternalRequest,
        { provide: HTTP_CLIENT, useClass: AxiosClient },
        { provide: AXIOS_OPTIONS, useValue: options },
      ],
      exports: [FireExternalRequest],
    };
  }
}
