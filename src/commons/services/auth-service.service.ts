import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { AuthGuard } from './../../guards/auth.guard';
import { BaseCommon } from '../base-common';
import { BaseService } from './base-service.service';

import { API_URL } from '../../config/app.config';
import { ENV } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authGuard: AuthGuard,
    public http: HttpClient,
    public common: BaseCommon,
    public service: BaseService
  ) { }


  login(login: string, senha: string) {

    if (!this.service.checkNetwork()) {
      this.common.loading.dismiss();
      this.common.showToast('Sem conexão!');
    }
    else {
      const link: string = ENV.WS_AUTH + API_URL + 'loginMobile';
      const headers = new HttpHeaders()
        .set("login", login)
        .set("senha", senha);

      return new Promise((resolve, reject) => {
        this.http.get<JSON>(link, { headers }).subscribe(result => {
          this.authGuard.logged = true;
          resolve(result);
          console.log(result);
        }, (error) => {
          reject(error);
          console.log(error);
        });
      });

    }
  }


}
