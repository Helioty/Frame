import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Injectable({
    providedIn: 'root'
})

export class BaseCommon {

    public loading: any;

    constructor(
        private appVersion: AppVersion,
        private toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
    ) { }

    // Version --------------------------------------------------------------------------------------------------------
    async getAppName() {
        let appName = this.appVersion.getAppName()
        return appName;
    }

    async getVersionNumber() {
        let versionNumber: string = await this.appVersion.getVersionNumber();
        return versionNumber.toString();
    }

    async getVersionCode() {
        let versionCode = await this.appVersion.getVersionCode();
        let vCode = versionCode.toString();
        return vCode.replace(/^(\d{1})(\d)/, '$1.$2');
    }



    // Loading --------------------------------------------------------------------------------------------------------
    async showLoader() {
        this.loading = await this.loadingCtrl.create({
            spinner: 'circular',
            // message: 'Carregando...',
            // showBackdrop: true,
        });
        this.loading.present();
    }

    async showLoaderCustom(spin: any, msg: string) {
        this.loading = await this.loadingCtrl.create({
            spinner: spin,
            message: msg
        });
        this.loading.present();
    }



    // Toast's --------------------------------------------------------------------------------------------------------
    async showToast(msg: string) {
        let toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }



    // Alert's --------------------------------------------------------------------------------------------------------
    async showAlert(titulo: string, msg: string) {
        const alert = await this.alertCtrl.create({
            header: titulo,
            message: msg,
            buttons: ['OK']
        });
        await alert.present();
    }

    async showAlertInfo(msg: string) {
        const alert = await this.alertCtrl.create({
            header: "Info",
            message: msg,
            buttons: ['OK']
        });
        await alert.present();
    }

    async showAlertError(erro: string) {
        const alert = await this.alertCtrl.create({
            header: "ERRO!",
            message: erro,
            buttons: ['OK']
        });
        await alert.present();
    }

    // showAlert3(titulo, msg) {
    //     if (msg != null) {
    //         let alert = this.alertCtrl.create({
    //             title: titulo,
    //             subTitle: msg,
    //             buttons: [
    //                 {
    //                     text: 'ok',
    //                     handler: () => {
    //                         // this.exibeSkeletonLoading = true;
    //                     }
    //                 }
    //             ]
    //             // cssClass: 'alertCustomCss2'
    //         });
    //         alert.present();
    //     }

    // }



}