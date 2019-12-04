import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthGuard } from './../../guards/auth.guard';
import { BaseCommon } from './../../commons/base-common';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { AuthService } from '../../commons/services/auth-service.service';

import { ENV } from '../../environments/environment';

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

  constructor(
    private authGuard: AuthGuard,
    private androidFullScreen: AndroidFullScreen,
    public authService: AuthService,
    public common: BaseCommon,
    private menu: MenuController,
    private platform: Platform,
    private router: Router
  ) {

    this.goToFullScreen()

    if (ENV.mode == 'Production') {
      this.loginData.login = '';
      this.loginData.senha = '';
    } else {
      this.loginData.login = 'R6543MRM';
      this.loginData.senha = 'japa1966';
    }

    if (this.platform.is('ios') || this.platform.is('android')) {
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
    if (this.loginData.login == 'R6543MRM' && this.loginData.senha == 'japa1966') {
      this.authGuard.logged = true;
      if (this.authGuard.logged) {
        try {
          this.common.loading.dismiss()
          this.router.navigate(['home'])
        }
        catch (error) {
          console.log(error)
        }
      }
    }
    else {
      this.common.loading.dismiss()
      this.common.showAlertError("Usuario ou senha incorretos!")
    }

  }


  // doLogin() {

  //   if (this.platform.is('ios') || this.platform.is('android')) {

  //     this.common.showLoader();
  //     this.authService.login(this.loginData.login.toUpperCase(), this.loginData.senha).then((result) => {

  //       this.data = result;
  //       this.common.loading.dismiss();

  //       console.log('doLogin');
  //       console.log(result);

  //       if (this.data.status == 'OK') {
  //         //this.commonServices.showToast(this.data.message);
  //         this.common.showAlert(this.data.json().title, this.data.json().detail);
  //       } else {

  //         console.log('doLogin A');
  //         console.log(this.data);

  //         localStorage.setItem('token', this.data.authorization);
  //         localStorage.setItem('login', this.loginData.login);
  //         localStorage.setItem('foto', this.data.foto);
  //         localStorage.setItem('empresa', this.data.empresa.id);
  //         localStorage.setItem('nome', this.data.nomeDisplay);
  //         localStorage.setItem('host', '');
  //         localStorage.setItem('tms', this.data.empresa.usaFreteTMS);
  //         localStorage.setItem('isLoggedIn', 'true');

  //         // this.commonServices.fotoLogin = localStorage.getItem("foto");

  //         // this.authService.menuAcesso = 'Logout';

  //         if (localStorage.getItem("foto") === 'null') {
  //           this.noPhoto = true;
  //         }

  //         // troca de pagina
  //         this.entrar()

  //       }


  //     }, (err) => {
  //       this.isLoggedIn = false;
  //       this.common.loading.dismiss();
  //       this.loginData.senha = '';
  //       //this.commonServices.showToast(err);

  //       // by Ryuge 05/09/2019
  //       if (err.json().detail != null) {
  //         this.common.showAlert(err.json().title, err.json().detail);
  //       } else {
  //         this.common.showAlert("Ops!", err);
  //       }
  //     });

  //   } else {

  //     this.common.showLoader();
  //     this.authService.login(this.loginData.login.toUpperCase(), this.loginData.senha).then((result) => {

  //       this.data = result;
  //       this.common.loading.dismiss();

  //       if (this.data.status == 'OK') {
  //         this.common.showAlert(this.data.json().title, this.data.json().detail);
  //       } else {

  //         console.log('doLogin B');
  //         console.log(this.data);

  //         localStorage.setItem('token', this.data.authorization);
  //         localStorage.setItem('login', this.loginData.login);
  //         localStorage.setItem('foto', this.data.foto);
  //         localStorage.setItem('empresa', this.data.empresa.id);
  //         localStorage.setItem('nome', this.data.nomeDisplay);
  //         localStorage.setItem('host', '');
  //         localStorage.setItem('tms', this.data.empresa.usaFreteTMS);
  //         localStorage.setItem('isLoggedIn', 'true');

  //         // this.commonServices.fotoLogin = localStorage.getItem("foto");

  //         // this.authService.menuAcesso = 'Logout';

  //         if (localStorage.getItem("foto") === 'null') {
  //           this.noPhoto = true;
  //         }

  //         // troca de pagina
  //         this.entrar()

  //       }

  //     }, (err) => {
  //       this.isLoggedIn = false;
  //       this.common.loading.dismiss();
  //       this.loginData.senha = '';
  //       if (err.json().tittle && err.json().detail) {
  //         this.common.showAlert(err.json().title, err.json().detail);
  //       } else {
  //         this.common.showAlert("Ops!", err);
  //       }
  //     });

  //   }
  // }


}
