import { Component } from '@angular/core';

import { Platform, MenuController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';

import { BaseCommon } from './../commons/base-common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];

  constructor(
    private androidFullScreen: AndroidFullScreen,
    public alertCtrl: AlertController,
    public common: BaseCommon,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => console.log('Immersive mode supported'))
      .catch(err => console.log(err));
  }

  initializeApp() {
    console.log(this.platform)
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu.enable(false);
    });
  }

  buttonAction(page: any) {
    switch (page.title) {
      case ("Logout"): {
        this.showAlertLogout()
      } break;

      case ("Home"): {
        this.router.navigateByUrl(page.url)
      } break;

      case ("List"): {
        this.router.navigateByUrl(page.url)
      } break;

      default: {
        console.log("default of button Action!")
      }
    }
  }

  async showAlertLogout() {
    const alert = await this.alertCtrl.create({
      header: "Logout",
      subHeader: "Deseja sair?",
      buttons: ['NÃO', {
        text: 'SIM',
        handler: () => {
          this.router.navigate(['login'])
        }
      }]
    });
    await alert.present();
  }

}
