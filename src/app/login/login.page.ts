import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { BaseCommon } from './../../commons/base-common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public appVer: string = '';
  public versao: string = '';
  public isLoggedIn: boolean;
  public foto;
  public usuarioLogado;
  public noPhoto: boolean = false;

  // loginData = { login: 'R6543MRM', senha: 'japa1966' };
  loginData = { login: '', senha: '' };
  data: any;

  constructor(
    public common: BaseCommon,
    private menu: MenuController,
    private platform: Platform,
    private router: Router
  ) {


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

  showVersion() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      console.log("Versão")
      this.getVersionCode();
    }
  }

  async getVersionCode() {
    let versionCode = await this.common.getVersionCode()
    let versionNumber = await this.common.getVersionNumber()
    let V = 'Versão: ' + versionNumber + '<br/> Version Code: ' + versionCode;
    this.common.showAlert(await this.common.getAppName(), V);
  }

  entrar() {
    console.log("A")
    this.router.navigate(['home'])
  }

}
