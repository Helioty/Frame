import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly platform: Platform,
    private readonly menu: MenuController,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  /**
   * @description Executa codigos nativos após inicialização.
   */
  private initializeApp(): void {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#C40318');
      this.statusBar.hide();
      this.menu.enable(false);
    });
  }
}
