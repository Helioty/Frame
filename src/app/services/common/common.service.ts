import { Injectable } from "@angular/core";
import { App, AppInfo } from "@capacitor/app";
import {
  AlertController,
  LoadingController,
  Platform,
  ToastController
} from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  private appInfo: AppInfo;
  public loading: HTMLIonLoadingElement;

  public appName = '';
  public version = '';

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

  async getAppInfo(): Promise<void> {
    this.appInfo = await App.getInfo();
  }

  // Funções comuns
  public goToFullScreen() {
    if (this.platform.is("cordova")) {
      // this.androidFullScreen.isImmersiveModeSupported()
      //   .then(() => this.androidFullScreen.immersiveMode())
      //   .catch(err => console.log(err));
    }
  }

  // Version
  async getAppName() {
    if (this.platform.is("cordova")) {
      // this.appName = await this.appVersion.getAppName();
    }
  }

  async getVersionNumber() {
    if (this.platform.is("cordova")) {
      // this.version = await this.appVersion.getVersionNumber();
    }
  }

  showVersion() {
    if (this.platform.is("capacitor")) {
      const V = "Versão: " + this.appInfo.version;
      this.showAlert(this.appInfo.name, V);
    }
  }

  // Loading
  async showLoader() {
    this.loading = await this.loadingCtrl.create({
      spinner: "circular",
    });
    this.loading.present();
  }

  async showLoaderCustom(msg: string) {
    this.loading = await this.loadingCtrl.create({
      spinner: "circular",
      message: msg,
    });
    this.loading.present();
  }

  // Toast's
  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "bottom",
      buttons: [
        {
          side: "end",
          icon: "close",
          role: "cancel",
        },
      ],
    });
    toast.present();
  }

  // Alert's
  async showAlert(titulo: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: msg,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async showAlertInfo(msg: string) {
    const alert = await this.alertCtrl.create({
      header: "Info",
      message: msg,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async showAlertError(erro: string) {
    const alert = await this.alertCtrl.create({
      header: "ERRO!",
      message: erro,
      buttons: ["OK"],
    });
    await alert.present();
  }

  // formatação de string
  public formataCEP(value: string): string {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d{3})(\d)/, "$1.$2-$3");
    return value;
  }

  public formataCPFNPJ(value: string): string {
    value = value.replace(/\D/g, ""); // Remove tudo o que não é dígito

    if (value.length === 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      return value;
    } else if (value.length > 11) {
      value = value.replace(/^(\d{2})(\d)/, "$1.$2");
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
      return value;
    } else if (value.length < 11 && value.length > 9) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      return value;
    } else if (value.length > 6 && value.length <= 9) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      return value;
    } else if (value.length > 3 && value.length <= 6) {
      value = value.replace(/^(\d{3})(\d)/, "$1.$2");
      return value;
    } else {
      return value;
    }
  }

  public formataFONE(value: string): string {
    if (value.length === 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length < 11 && value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})/, "($1) $2-");
    } else if (value.length <= 6 && value.length > 2) {
      value = value.replace(/^(\d{2})/, "($1) ");
    } else {
      value = value.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return value;
  }
}
