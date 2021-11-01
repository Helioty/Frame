import { Injectable } from '@angular/core';
import { retry, take } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/http/base.service';
import { environment } from 'src/environments/environment';
import { IEnvironment } from './app.config.interface';

export let API_URL = '';

export const ENV: IEnvironment = {
  WS_AUTH: 'https://login.',
  WS_VERSION: 'https://versao.',
  WS_PRODUTO: 'https://produto.',
  WS_CRM: 'https://crm.',
  WS_VENDAS: 'https://vendas.',
  WS_PUBLIC: 'https://publico.',
  WS_COMMONS: 'https://comum.',
};

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  constructor(private readonly http: BaseService) {}

  /**
   * @author helio.souza
   * @description Retorna um Promise com a API_URL utilizada na rede.
   * @returns API_URL.
   */
  public getURL(): Promise<string> {
    const apiUrl = environment.urlService;
    const hasUrl = localStorage.getItem('API_URL') ? true : false;
    const options = { token: false, showError: !hasUrl };
    return new Promise((resolve, reject) => {
      this.http
        .get<{ server: string }>(apiUrl, options)
        .pipe(take(1), retry(1))
        .subscribe({
          next: (response) => {
            localStorage.setItem('API_URL', response.server + '/');
            console.log('Conected to', response.server);
            API_URL = response.server + '/';
            resolve(API_URL);
          },
          error: (err) => {
            if (hasUrl) {
              API_URL = localStorage.getItem('API_URL') as string;
              resolve(API_URL);
            } else {
              reject(err);
            }
          },
        });
    });
  }
}
