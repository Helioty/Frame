import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { BaseCommon } from '../base-common';
import { BaseService } from './base-service.service';

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

      let link: string;
      let headers = new HttpHeaders();

      headers.append('login', login);
      headers.append('senha', senha);

      return this.http.get(link, { headers: headers }).subscribe(res => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });

    }
  }


}
