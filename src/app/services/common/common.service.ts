import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import {
  AlertController,
  LoadingController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { ScannerService } from 'src/app/services/scanner/scanner.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public loading: HTMLIonLoadingElement;
  public appName = 'Frame';
  public version = '';

  constructor(
    private readonly scanner: ScannerService,
    private readonly toastCtrl: ToastController,
    private readonly fullScreen: AndroidFullScreen,
    private readonly loadingCtrl: LoadingController,
    private readonly navigationBar: NavigationBar,
    private readonly alertCtrl: AlertController,
    private readonly platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.getAppInfo();
    });
  }

  /**
   * @author helio.souza
   * @description Pega as informações basicas da aplicação.
   */
  async getAppInfo(): Promise<void> {
    if (this.platform.is('capacitor')) {
      const appInfo = await App.getInfo();
      this.appName = appInfo.name;
      this.version = appInfo.version;
    }
  }

  /**
   * @author helio.souza
   * @description Ativa o modo imersivo do Android.
   */
  public goToFullScreen() {
    if (this.platform.is('cordova')) {
      this.fullScreen
        .isImmersiveModeSupported()
        .then(() => {
          const autoHide = true;
          this.navigationBar.setUp(autoHide);
          this.fullScreen.immersiveMode();
        })
        .catch((err) => console.log(err));
    }
  }

  /**
   * @author helio.souza
   * @description Exibe um IonAlert com a versão instalada.
   */
  async showVersion(): Promise<void> {
    const V = 'Versão: ' + this.version;
    await this.showAlert(this.appName, V);
  }

  /**
   * @author helio.souza
   * @description Pausa o foco do Scanner e exibe um IonLoadingElement, ao desativar o Loading o foco do Scanner é reativado.
   */
  async showLoader(): Promise<void> {
    this.scanner.focusPause();
    this.loading = await this.loadingCtrl.create({
      spinner: 'circular',
    });
    this.loading.onWillDismiss().then(() => {
      this.scanner.focusPlay();
    });
    this.loading.present();
  }

  /**
   * @author helio.souza
   * @description Pausa o foco do Scanner e exibe um IonLoadingElement, ao desativar o Loading o foco do Scanner é reativado.
   * @param msg Mensagem para ser exibida no Loading.
   */
  async showLoaderCustom(msg: string): Promise<void> {
    this.scanner.focusPause();
    this.loading = await this.loadingCtrl.create({
      spinner: 'circular',
      message: msg,
    });
    this.loading.onWillDismiss().then(() => {
      this.scanner.focusPlay();
    });
    this.loading.present();
  }

  /**
   * @author helio.souza
   * @description Exibe um IonToastElement com uma mensagem personalizada.
   * @param msg Mensagem para ser exibida no Toast.
   */
  async showToast(msg: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }

  /**
   * @author helio.souza
   * @description Exibe um IonAlert com titulo e mensagem personalizadas, ativa e desativar o Alert o foco do Scanner.
   * @param titulo Title do IonAlert.
   * @param msg Mensagem do IonAlert.
   */
  async showAlert(titulo: string, msg: string): Promise<void> {
    this.scanner.focusPause();
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: msg,
      buttons: ['OK'],
    });
    alert.onWillDismiss().then(() => {
      this.scanner.focusPlay();
    });
    await alert.present();
  }

  /**
   * @author helio.souza
   * @description Exibe um IonAlert com titulo, mensagem, nome e versão da aplicação, ativa e desativar o Alert o foco do Scanner.
   * @param titulo Title do IonAlert.
   * @param erro Mensagem de erro.
   */
  async showAlertError(titulo: string, erro: string): Promise<void> {
    this.scanner.focusPause();
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: this.appName + this.version ? ` - ${this.version}` : '',
      message: erro,
      buttons: ['FECHAR'],
      cssClass: 'alertError',
    });
    alert.onWillDismiss().then(() => {
      this.scanner.focusPlay();
    });
    await alert.present();
  }

  /**
   * @author helio.souza
   * @description Exibe um IonAlert com titulo e mensagem personalizadas, ativa e desativar o Alert o foco do Scanner.
   * @param titulo Title do IonAlert.
   * @param message Mensagem do IonAlert.
   * @param handler Arrow Function contendo ação para o botão confirmar.
   * @param allowClose Controla o dismiss do IonAlert. Default: true.
   * @param showCancel Controla a exibição do botão cancelar. Default: true.
   * @param cssClasses Array de classes CSS para estilizar o Alert.
   * @param inputs Array de Inputs.
   */
  async showAlertAction(
    base: { titulo: string; message: string; handler: (data: any) => any },
    options = {
      allowClose: true,
      showCancel: true,
      cssClasses: [''] || null,
      inputs: [] || null,
    }
  ): Promise<void> {
    this.scanner.focusPause();
    const buttons = [];
    if (options.showCancel) {
      buttons.push(this.getCancelBtn());
    }
    buttons.push(this.getConfirmaBtn(base.handler));
    const alert = await this.alertCtrl.create({
      backdropDismiss: options.allowClose,
      cssClass: options?.cssClasses || [],
      inputs: options?.inputs || [],
      message: base.message,
      header: base.titulo,
      buttons,
    });
    alert.onWillDismiss().then(() => this.scanner.focusPlay());
    await alert.present();
  }

  /**
   * @description Retorna AlertButton.
   * @returns AlertButton.
   */
  getCancelBtn(): any {
    return {
      text: 'CANCELAR',
      cssClass: ['alertButtonCenter'],
      role: 'cancel',
    };
  }

  /**
   * @description Retorna um AlertButton com ação.
   * @param handler Ação do botão.
   * @returns AlertButton.
   */
  getConfirmaBtn(handler: (data: any) => any): any {
    return {
      text: 'CONFIRMAR',
      cssClass: ['alertButtonFcGreen', 'alertButtonCenter'],
      handler,
    };
  }

  // formatação de string
  public formataCEP(value: string): string {
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d{3})(\d)/, '$1.$2-$3');
    return value;
  }

  public formataCPFNPJ(value: string): string {
    value = value.replace(/\D/g, ''); // Remove tudo o que não é dígito

    if (value.length === 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return value;
    } else if (value.length > 11) {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
      return value;
    } else if (value.length < 11 && value.length > 9) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return value;
    } else if (value.length > 6 && value.length <= 9) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      return value;
    } else if (value.length > 3 && value.length <= 6) {
      value = value.replace(/^(\d{3})(\d)/, '$1.$2');
      return value;
    } else {
      return value;
    }
  }

  public formataFONE(value: string): string {
    if (value.length === 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length < 11 && value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})/, '($1) $2-');
    } else if (value.length <= 6 && value.length > 2) {
      value = value.replace(/^(\d{2})/, '($1) ');
    } else {
      value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return value;
  }
}
