import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { AppConfigService } from 'src/app/config/app.config.service';
import { IAuth } from 'src/app/shared/services/auth/auth.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public isLoggedIn = false;
  public usuarioLogado: string;
  public noPhoto = true;
  public foto: string;

  public loginData = { login: '', senha: '' };
  public disableLoginBtn = true;
  public emFoco = false;

  constructor(
    private appConfig: AppConfigService,
    private auth: AuthService,
    private common: CommonService,
    private menu: MenuController,
    private platform: Platform,
    private navControl: NavController
  ) {
    if (environment.production) {
      this.loginData.login = '';
      this.loginData.senha = '';
    } else {
      this.common.showToast('Development');
      this.loginData.login = 'R6543MRM';
      this.loginData.senha = 'r6543mrm';
    }
  }

  ngOnInit(): void {
    console.log('Login OnInit');
    const loginData = this.auth.getLoginInfo();
    this.restoreLoginData(loginData);
  }

  ionViewWillEnter(): void {
    this.menu.enable(false);
    this.common.goToFullScreen();
  }

  ionViewDidEnter(): void {
    this.common.goToFullScreen();
    this.appConfig.getURL().finally(() => {
      this.disableLoginBtn = false;
    });
  }

  /**
   * @description Exibe um Alert com a versão instalada da aplicação.
   */
  showVersion(): void {
    this.common.showVersion();
  }

  /**
   * @description Executa o serviço de Login.
   */
  async entrar(data: { login: string; senha: string }): Promise<void> {
    await this.common.showLoader();
    await this.auth
      .login(data.login.toUpperCase(), data.senha)
      .finally(async () => {
        await this.common.loading.dismiss();
      })
      .then(
        () => {
          console.log('Logado!');
          this.navControl.navigateRoot('/home');
        },
        () => {
          this.isLoggedIn = false;
          this.loginData.senha = '';
        }
      );
  }

  /**
   * @description Altera a exibição da tela para o login completo.
   */
  logout(): void {
    this.isLoggedIn = false;
    this.loginData.login = '';
    this.loginData.senha = '';
  }

  /**
   * @description Restaura os dados do ultimo login.
   */
  private restoreLoginData(loginData: IAuth): void {
    if (loginData) {
      this.isLoggedIn = true;
      this.usuarioLogado = loginData.nomeDisplay;
      this.loginData.login = loginData.login + loginData.iniciais;
      this.foto = loginData.foto;
      if (loginData.foto !== 'null' && loginData.foto !== undefined) {
        this.noPhoto = false;
      }
    }
  }

  /**
   * @description Muda a exibição da tela quando em foco.
   * @param status boolean.
   */
  inFoco(status: boolean): void {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.emFoco = status;
    }
  }
}
