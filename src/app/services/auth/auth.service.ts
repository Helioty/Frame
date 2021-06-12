import { HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { API_URL, ENV } from 'src/app/config/app.config.service';
import { AuthGuard } from 'src/app/shared/guards/auth/auth.guard';
import { BaseService } from 'src/app/shared/services/http/base.service';
import { CommonService } from '../common/common.service';
import { ScannerService } from '../scanner/scanner.service';
import { IAuth } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginEvent = new EventEmitter<IAuth>();

  constructor(
    private authGuard: AuthGuard,
    private common: CommonService,
    private scannerS: ScannerService,
    private navControl: NavController,
    private http: BaseService
  ) {
    this.restoreLoginData();
  }

  /**
   * @author helio.souza
   * @description Executa o serviço de login em JAVA.
   * @param login login do úsuario
   * @param senha senha do úsuario
   * @returns Retorna uma Promise com o retorno do serviço.
   */
  login(login: string, senha: string): Promise<IAuth> {
    const link = ENV.WS_AUTH + API_URL + 'loginMobile';
    const options = { token: false, showError: true };
    const headers = new HttpHeaders().set('login', login).set('senha', senha);

    return new Promise((resolve, reject) => {
      this.http.get<IAuth>(link, options, headers).subscribe({
        next: (response) => {
          this.setStorage(response, login);
          this.authGuard.setStatus = true;
          console.log(response);
          resolve(response);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  /**
   * @author helio.souza
   * @description Exibe IonAlert de logout.
   */
  public showAlertLogout(): void {
    const handler = () => {
      this.authGuard.setStatus = false;
      this.scannerS.focusOff();
      this.navControl.navigateRoot(['login']);
    };
    this.common.showAlertAction('Logout', 'Deseja sair?', handler);
  }

  /**
   * @author helio.souza
   * @description Retorna as informações referentes ao login.
   */
  public getLoginInfo(): IAuth {
    return JSON.parse(localStorage.getItem('loginServiceData')) as IAuth;
  }

  /**
   * @author helio.souza
   * @description Restaura os dados do ultimo login.
   */
  private restoreLoginData(): void {
    if (localStorage.getItem('token')) {
      const loginData = JSON.parse(localStorage.getItem('loginServiceData')) as IAuth;
      this.loginEvent.emit(loginData);
    }
  }

  /**
   * @author helio.souza
   * @description Grava os dados do Login no LocalStorage.
   */
  private setStorage(data: IAuth, login: string): void {
    const date = new Date();
    localStorage.setItem('token', data.authorization);
    localStorage.setItem('login', login);
    localStorage.setItem('loginDate', String(date.getDate()));
    localStorage.setItem('empresa', String(data.empresa.id));
    localStorage.setItem('loginServiceData', JSON.stringify(data));
    localStorage.setItem('matricula', String(data.matricula));
    localStorage.setItem('tms', String(data.empresa.usaFreteTMS));
    this.loginEvent.emit(data);
  }
}
