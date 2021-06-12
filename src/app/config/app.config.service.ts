import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common/common.service';
import { IEnvironment } from './app.config.interface';

export let API_URL = '';

export const ENV: IEnvironment = {
  WS_AUTH: 'https://login.',
  WS_VERSION: '',
  WS_PRODUTO: 'https://produto.',
  WS_CRM: 'https://crm.',
  WS_VENDAS: 'https://vendas.',
  WS_PUBLIC: 'https://publico.',
  WS_COMMONS: 'https://comum.',
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private getApiUrl = '';

  constructor(
    private http: HttpClient,
    private common: CommonService,
  ) {


    this.getApiUrl = '';
    this.getURL();
    this.getApiUrl = '';
    this.getURL();

  }

  public getURL() {
    const apiUrl = this.getApiUrl;
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl).subscribe((link: any) => {
        console.log(link);
        API_URL = link.server + '/';
        resolve(link);
      }, error => {
        console.log(error);
        this.common.showAlertError(JSON.stringify(error));
        reject(error);
      });
    });
  }

}
