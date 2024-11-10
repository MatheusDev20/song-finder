/* eslint-disable @typescript-eslint/no-require-imports */

const querystring = require('node:querystring');

import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthProvider } from 'src/@types';
import { CustomLogger } from '../logger/logger.provider';

@Injectable()
export class SpotfyAuthProvider implements AuthProvider {
  private clientId: string;
  private clientSecret: string;
  private authUrl: string;
  private TTL_EXPIRATION = 1800000;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private logger: CustomLogger,
  ) {
    this.clientId = process.env.SPOTFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTFY_CLIENT_SECRET;
    this.authUrl = process.env.SPOTFY_AUTH_URL;
  }

  private getAuthOptions = () => {
    return {
      method: 'post',
      url: this.authUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(this.clientId + ':' + this.clientSecret).toString(
            'base64',
          ),
      },
      form: {
        grant_type: 'client_credentials',
      },
      json: true,
    };
  };

  async getAuthHeaders() {
    const cachedToken = await this.cacheManager.get('spotfy_auth');
    console.log(cachedToken);
    if (cachedToken) {
      this.logger.log('Using Spotfy Cached Token');
      return { Authorization: 'Bearer ' + cachedToken };
    }

    try {
      const options = this.getAuthOptions();
      const params = querystring.stringify(options.form);
      const { url, ...rest } = options;

      const res = await axios[options.method](url, params, {
        headers: rest.headers,
      });

      const { access_token } = res.data;
      if (access_token)
        await this.cacheManager.set(
          'spotfy_auth',
          access_token,
          this.TTL_EXPIRATION,
        );

      this.logger.log(`Genereted new Spotfy Token ${new Date().toISOString()}`);

      return { Authorization: 'Bearer ' + access_token };
    } catch (err: any) {
      this.logger.error(`Error generating Spotify token: ${err.message}`);
      throw new Error(err);
    }
  }
}
