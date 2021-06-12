import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private menu: MenuController
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
      this.menu.enable(false);
    });
  }
}
