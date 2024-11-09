import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeneralConfigService {
  constructor(private configService: ConfigService) {}

  getAppOptions() {}
}
