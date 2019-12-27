import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { BaseCommon } from './../../commons/base-common';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { AuthService } from '../../commons/services/auth-service.service';

import { ENV } from '../../environments/environment';
import { AppConfig, getHTTP } from 'src/config/app.config';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public appVer: string = '';
  public versao: string = '';
  public isLoggedIn: boolean;
  public foto: any;
  public usuarioLogado;
  public noPhoto: boolean = false;

  loginData = { login: '', senha: '' };
  data: any;

  public emFoco: boolean = false;

  constructor(
    public appComponent: AppComponent,
    public appConfig: AppConfig,
    private androidFullScreen: AndroidFullScreen,
    public authService: AuthService,
    public common: BaseCommon,
    private menu: MenuController,
    private platform: Platform,
    private router: Router
  ) {

    if (ENV.mode == 'Production') {
      this.loginData.login = '';
      this.loginData.senha = '';
    } else {
      // this.loginData.login = 'R6543MRM';
      // this.loginData.senha = 'japa1966';
    }

    if (this.platform.is('ios') || this.platform.is('android')) {
      this.goToFullScreen()
      this.versao = '';
    }

    if (localStorage.getItem("token")) {
      this.isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
      this.foto = localStorage.getItem("foto");
      this.usuarioLogado = localStorage.getItem("nome");
      this.loginData.login = localStorage.getItem("login");

      if (localStorage.getItem("foto") === 'null') {
        this.noPhoto = true;
      }
    }
  }

  ngOnInit() {
    console.log("ngOnInit")
    console.log(getHTTP());
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter")
    this.menu.enable(false);
    this.goToFullScreen()
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter")
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave")
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave")
  }

  goToFullScreen() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch(err => console.log(err));
  }

  showVersion() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      console.log("Versão")
      this.getVersionCode();
    }
  }

  async getVersionCode() {
    let versionCode = await this.common.getVersionCode()
    let versionNumber = await this.common.getVersionNumber()
    let V = 'Versão: ' + versionNumber + '<br> Version Code: ' + versionCode;
    this.common.showAlert(await this.common.getAppName(), V);
  }

  async entrar() {
    await this.common.showLoader()

    this.authService.login(this.loginData.login.toUpperCase(), this.loginData.senha).then((result) => {
      this.common.loading.dismiss();
      this.data = result;

      if (this.data.status == 'OK') {
        this.common.showAlert(this.data.json().title, this.data.json().detail);
      } else {

        localStorage.setItem('token', this.data.authorization);
        localStorage.setItem('login', this.loginData.login);
        localStorage.setItem('foto', this.data.foto);
        localStorage.setItem('empresa', this.data.empresa.id);
        localStorage.setItem('nome', this.data.nomeDisplay);
        localStorage.setItem('isLoggedIn', 'true');

        // comentado por Helio 26/12/2019
        // this.authService.menuAcesso = 'Logout';

        if (localStorage.getItem("foto") === 'null') {
          this.noPhoto = true;
        }

        this.appComponent.getStatus()

        this.router.navigate(['home'])
        this.common.loading.dismiss()

      }

    }, (error) => {
      this.isLoggedIn = false;
      this.common.loading.dismiss();
      this.loginData.senha = '';

      let erro = error.error;

      if (erro.tittle != "" && erro.detail != "") {
        this.common.showAlert(erro.title, erro.detail);
      } else {
        this.common.showAlert("Ops!", error);
      }
    });

  }

  logout() {
    this.isLoggedIn = false;

    if (localStorage.getItem("token")) {
      localStorage.clear();
    }
  }

  inFoco() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.emFoco = !this.emFoco;
    }
  }

}
