import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly menu: MenuController,
    private readonly common: CommonService,
    private readonly platform: Platform
  ) {
    this.initializeApp();
  }

  /**
   * @description Executa codigos nativos após inicialização.
   */
  private initializeApp(): void {
    this.platform.ready().then(() => {
      // this.splashScreen.hide();
      // this.statusBar.backgroundColorByHexString('#C40318');
      // this.statusBar.hide();
      this.common.goToFullScreen();
      this.menu.enable(false);
    });
  }
}
