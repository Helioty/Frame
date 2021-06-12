import { Injectable } from '@angular/core';
import { App, AppInfo } from '@capacitor/app';
import {
  AlertController,
  LoadingController,
  Platform,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public loading: HTMLIonLoadingElement;
  private appInfo: AppInfo;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform
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
    this.appInfo = await App.getInfo();
  }

  // Funções comuns
  public goToFullScreen() {
    if (this.platform.is('cordova')) {
      // this.androidFullScreen.isImmersiveModeSupported()
      //   .then(() => this.androidFullScreen.immersiveMode())
      //   .catch(err => console.log(err));
    }
  }

  /**
   * @author helio.souza
   * @description Exibe um IonAlert com a versão instalada.
   */
  async showVersion(): Promise<void> {
    const V = 'Versão: ' + this.appInfo.version;
    await this.showAlert(this.appInfo.name, V);
  }

  /**
   * @author helio.souza
   * @description Pausa o foco do Scanner e exibe um IonLoadingElement, ao desativar o Loading o foco do Scanner é reativado.
   */
  async showLoader(): Promise<void> {
    this.scannerS.focusPause();
    this.loading = await this.loadingCtrl.create({
      spinner: 'circular',
    });
    this.loading.onWillDismiss().then(() => {
      this.scannerS.focusPlay();
    });
    this.loading.present();
  }

  /**
   * @author helio.souza
   * @description Pausa o foco do Scanner e exibe um IonLoadingElement, ao desativar o Loading o foco do Scanner é reativado.
   * @param msg Mensagem para ser exibida no Loading.
   */
  async showLoaderCustom(msg: string): Promise<void> {
    this.scannerS.focusPause();
    this.loading = await this.loadingCtrl.create({
      spinner: 'circular',
      message: msg,
    });
    this.loading.onWillDismiss().then(() => {
      this.scannerS.focusPlay();
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
    this.scannerS.focusPause();
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: msg,
      buttons: ['OK'],
    });
    alert.onWillDismiss().then(() => {
      this.scannerS.focusPlay();
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
    this.scannerS.focusPause();
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: this.appName + (this.version !== '' ? ' - Versão: ' + this.version : ''),
      message: erro,
      buttons: ['FECHAR'],
      cssClass: 'alertError',
    });
    alert.onWillDismiss().then(() => {
      this.scannerS.focusPlay();
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
   */
  async showAlertAction(
    titulo: string,
    message: string,
    handler: () => void,
    allowClose = true,
    showCancel = true,
    cssClasses: string[] = []
  ): Promise<void> {
    this.scannerS.focusPause();
    const buttons = [];

    if (showCancel) {
      buttons.push({
        text: 'CANCELAR',
        cssClass: ['alertButtonCenter'],
        role: 'cancel',
      });
    }

    buttons.push({
      text: 'CONFIRMAR',
      cssClass: ['alertButtonFcGreen', 'alertButtonCenter'],
      handler,
    });

    const alert = await this.alertCtrl.create({
      backdropDismiss: allowClose,
      cssClass: cssClasses,
      header: titulo,
      message,
      buttons,
    });
    alert.onWillDismiss().then(() => {
      this.scannerS.focusPlay();
    });
    await alert.present();
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
