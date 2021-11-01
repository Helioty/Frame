import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { API_URL, ENV } from 'src/app/config/app.config.service';
import { IUpdate, UpdateMessage } from './update.interface';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(
    private http: HttpClient,
    private platform: Platform,
    private alert: AlertController,
    private appVersion: AppVersion
  ) {}

  /**
   * @author helio.souza
   * @description Retorna a versão mais recente disponível do aplicativo.
   * @returns Número da versão.
   */
  getRemoteVersion(): Promise<IUpdate> {
    const url = ENV.WS_VERSION + API_URL + 'link do serviço que retorna a versão';
    return this.http.get<IUpdate>(url).toPromise();
  }

  /**
   * @author helio.souza
   * @description Retorna a versão do aplicativo instalada localmente, ex: "1.2.3"
   * @returns Número da versão.
   */
  getLocalVersion(): Promise<string> {
    if (this.platform.is('cordova')) {
      return this.appVersion.getVersionNumber();
    } else {
      return Promise.resolve('');
    }
  }

  /**
   * @description Compara a verão mais atual com a instalada localmente
   */
  async checkForUpdate(): Promise<void> {
    const local = await this.getLocalVersion().then((version) => version.split('.'));
    await this.getRemoteVersion().then((remote) => {
      if (remote.enabled) {
        const latest = (remote.version as string).split('.');

        if (latest[0] > local[0] || latest[1] > local[1]) {
          this.showUpdateMessage(remote.message);
        } else if (latest[2] > local[2]) {
          this.showUpdateMessage(remote.message, true);
        }
      } else {
        this.showUpdateMessage(remote.message);
      }
    });
  }

  /**
   * @author helio.souza
   * @param message Objeto de Mensagem do Update Service.
   * @param allowClose Controla o cancelamento do Alert.
   */
  private async showUpdateMessage(
    message: UpdateMessage,
    allowClose = false
  ): Promise<void> {
    const buttons = [];

    if (allowClose) {
      buttons.push({
        text: 'FECHAR',
        cssClass: ['alertButtonCenter'],
        role: 'cancel',
      });
    }

    if (message.btn) {
      buttons.push({
        text: message.btn,
        cssClass: ['alertButtonFcGreen', 'alertButtonCenter'],
        handler: () => {
          console.log('New Update!');
        },
      });
    }

    const alert = await this.alert.create({
      backdropDismiss: allowClose,
      message: message.message,
      header: message.title,
      buttons,
    });
    await alert.present();
  }
}
