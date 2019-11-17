import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { BaseCommon } from './../../commons/base-common';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private androidFullScreen: AndroidFullScreen,
    public common: BaseCommon,
    private menu: MenuController,
  ) {

  }

  ngOnInit() {
    console.log("ngOnInit")
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter")
    this.menu.enable(true);
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => console.log('Immersive mode supported'))
      .catch(err => console.log(err));
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

  teste() {
    this.common.showAlertError("Aconteceu um erro!")
  }

}
