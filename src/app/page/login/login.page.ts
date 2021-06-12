import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { AppConfigService } from 'src/app/config/app.config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ENV } from 'src/environments/environment';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public isLoggedIn: boolean;
  public foto: any;
  public usuarioLogado: any;
  public noPhoto = false;

  loginData = { login: '', senha: '' };
  data: any;

  public emFoco = false;

  constructor(
    public appComponent: AppComponent,
    public appConfig: AppConfigService,
    public authService: AuthService,
    public common: CommonService,
    private menu: MenuController,
    private platform: Platform,
    private navControl: NavController,
    private router: Router
  ) {

    if (ENV.mode === 'Production') {
      this.loginData.login = '';
      this.loginData.senha = '';
    } else {
      this.common.showToast(ENV.mode);
      this.loginData.login = 'R6543MRM';
      this.loginData.senha = 'R6543MRM';
    }

    if (localStorage.getItem('token')) {
      this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
      this.foto = localStorage.getItem('foto');
      this.usuarioLogado = localStorage.getItem('nome');
      this.loginData.login = localStorage.getItem('login');

      if (localStorage.getItem('foto') === 'null') {
        this.noPhoto = true;
      }
    }
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ionViewWillEnter() {
    this.menu.enable(false);
    this.common.goToFullScreen();
  }

  ionViewDidEnter() {
    this.common.goToFullScreen();
  }

  ionViewWillLeave() {

  }

  ionViewDidLeave() {

  }

  showVersion() {
    this.common.showVersion();
  }

  async entrar() {
    await this.common.showLoader();

    this.authService.login(this.loginData.login.toUpperCase(), this.loginData.senha)
      .then((result: any) => {
        this.common.loading.dismiss();
        this.data = result;
        console.log('entrou aqui');

        if (this.data.status === 'OK') {
          this.common.showAlert(this.data.title, this.data.detail);
        } else {

          localStorage.setItem('token', this.data.authorization);
          localStorage.setItem('login', this.loginData.login);
          localStorage.setItem('foto', this.data.foto);
          localStorage.setItem('empresa', this.data.empresa.id);
          localStorage.setItem('nome', this.data.nomeDisplay);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('tms', this.data.empresa.usaFreteTMS);

          if (localStorage.getItem('foto') === 'null') {
            this.noPhoto = true;
          }

          this.appComponent.getStatus();
          this.navControl.navigateRoot('/home');
          this.common.loading.dismiss();
        }
      }, (error: any) => {
        console.log(error);
        this.isLoggedIn = false;
        this.common.loading.dismiss();
        this.loginData.senha = '';
      });

  }

  logout() {
    this.isLoggedIn = false;

    if (localStorage.getItem('token')) {
      localStorage.clear();
    }
  }

  inFoco() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.emFoco = !this.emFoco;
    }
  }

}
