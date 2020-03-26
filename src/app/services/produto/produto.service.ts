import { Injectable } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { BaseService } from '../base-service.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ENV } from 'src/environments/environment';
import { API_URL } from 'src/app/config/app.config.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private alertCtrl: AlertController,
    private baseService: BaseService,
    private common: CommonService,
    private navControl: NavController
  ) { }


  // by Ryuge 18/09/2018
  // edit by Helio 19/03/2020
  public getAllListImage(codigo: string) {
    const link = ENV.WS_PRODUTO + API_URL + 'listImages/' + codigo;

    return new Promise((resolve, reject) => {
      this.baseService.get(link).then((result: any) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  // edit by Helio 19/03/2020
  public getProductInfomation(codigoProduto: string) {
    const link = ENV.WS_PRODUTO + API_URL + 'detalhe/' + codigoProduto;

    return new Promise((resolve, reject) => {
      this.baseService.getNoShowError(link).then((result: any) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

}
