import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV } from 'src/environments/environment';
import { CommonService } from 'src/app/services/common/common.service';

export let API_URL = '';

export function getHTTP(): any {
  return API_URL;
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

    if (ENV.mode === 'Production') {

      this.getApiUrl = 'https://publico.api.imb/getUrlServiceOKD';
      this.getURL();
      getHTTP();

    } else {

      this.getApiUrl = 'https://publico.staging.imb/getUrlServiceOKD';
      this.getURL();
      getHTTP();

    }

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
