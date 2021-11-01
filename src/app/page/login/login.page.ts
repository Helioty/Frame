import { Component, OnInit } from '@angular/core';
import { isPlatform, MenuController, NavController } from '@ionic/angular';
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
  public usuarioLogado = '';
  public noPhoto = true;
  public foto = '';

  public loginData = { login: '', senha: '' };
  public disableLoginBtn = true;
  public emFoco = false;

  public appName = '';

  constructor(
    private readonly appConfig: AppConfigService,
    private readonly auth: AuthService,
    private readonly common: CommonService,
    private readonly menu: MenuController,
    private readonly navControl: NavController
  ) {}

  ngOnInit(): void {
    console.log('Login OnInit');
    if (environment.production) {
      this.loginData.login = '';
      this.loginData.senha = '';
    } else {
      this.common.showToast('Development');
      this.loginData.login = 'R6543MRM';
      this.loginData.senha = 'r6543mrm';
    }
    const loginData = this.auth.getLoginInfo();
    this.restoreLoginData(loginData);
  }

  ionViewWillEnter(): void {
    this.menu.enable(false);
    this.common.goToFullScreen();
    this.appName = this.common.appName;
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
    }
    if (loginData && loginData.foto && loginData.foto !== 'null') {
      this.noPhoto = false;
    }
  }

  /**
   * @description Muda a exibição da tela quando em foco.
   * @param status boolean.
   */
  inFoco(status: boolean): void {
    if (isPlatform('android') || isPlatform('ios')) {
      this.emFoco = status;
    }
  }
}
