import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { BaseCommon } from './../../commons/base-common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public common: BaseCommon,
    private menu: MenuController,
  ) {
    this.menu.enable(true);
    // this.common.showLoader()
  }

  teste() {
    this.common.showAlertError("Aconteceu um erro!")
  }

  async retor() {
    let ret = await this.common.showAlertRetorno("teste retorno", "vendo se retorna")
    console.log("Retorno a seguir:")
    console.log(ret)
  }
}
