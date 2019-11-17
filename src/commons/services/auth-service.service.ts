import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { BaseCommon } from '../base-common';
import { BaseService } from './base-service.service';

import { API_URL } from '../../config/app.config';
import { ENV } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient,
    public common: BaseCommon,
    public service: BaseService
  ) { }


  login(login: string, senha: string) {

    if (!this.service.checkNetwork()) {
      this.common.loading.dismiss();
      this.common.showToast('Sem conexão!');
    } else {

      let link: string = ENV.WS_AUTH + API_URL + 'loginMobile';
      let headers = new HttpHeaders();

      headers.append('login', login);
      headers.append('senha', senha);

      return new Promise((resolve, reject) => {
        this.http.get(link, { headers: headers }).subscribe(res => {
          resolve(res);
          console.log(res);
        }, (err) => {
          console.log(err);
        });
      });

    }
  }


}
