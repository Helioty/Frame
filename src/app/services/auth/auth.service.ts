import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { API_URL } from 'src/app/config/app.config.service';
import { ENV } from 'src/environments/environment';
import { BaseService } from '../base-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authGuard: AuthGuard,
    private base: BaseService,
    private http: HttpClient
  ) { }

  login(login: string, senha: string): Promise<any> {
    const link: string = ENV.WS_AUTH + API_URL + 'loginMobile';
    const headers = new HttpHeaders()
      .set('login', login)
      .set('senha', senha);

    return new Promise((resolve, reject) => {
      this.http.get<JSON>(link, { headers }).subscribe(result => {
        this.authGuard.logged = true;
        console.log(result);
        resolve(result);
      }, (error) => {
        this.base.showError(error);
        reject(error);
      });
    });

  }

}
