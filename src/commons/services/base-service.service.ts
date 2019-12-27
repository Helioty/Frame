import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Network } from "@ionic-native/network/ngx";
import { Platform } from "@ionic/angular";
import { BaseCommon } from '../base-common';

import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { resolve } from 'url';


declare let navigator: any;
declare let Connection: any;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    public http: HttpClient,
    public common: BaseCommon,
    public network: Network,
    public platform: Platform
  ) { }

  public checkNetwork() {
    if (this.platform.is("cordova")) {
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN] = "Unknown connection";
      states[Connection.ETHERNET] = "Ethernet connection";
      states[Connection.WIFI] = "WiFi connection";
      states[Connection.CELL_2G] = "Cell 2G connection";
      states[Connection.CELL_3G] = "Cell 3G connection";
      states[Connection.CELL_4G] = "Cell 4G connection";
      states[Connection.CELL] = "Cell generic connection";
      states[Connection.NONE] = "No network connection";

      if (
        // networkState == Connection.UNKNOWN ||
        networkState == Connection.NONE
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }


  // metodo especifio para cadastro cliente
  // getNoAlert(parameters: string) {
  //   if (!this.checkNetwork()) {
  //     this.common.showToast("Sem conexão!");
  //   } else {
  //     return new Promise((resolve, reject) => {
  //       let Headers = new HttpHeaders();
  //       // headers
  //       Headers.append("x-auth-token", localStorage.getItem("token"));
  //       let options = new HttpRequest({ headers: Headers, reportProgress: true });
  //       let result = this.http
  //         .get(parameters, options)
  //         .subscribe(
  //           (result: any) => {
  //             resolve(result);
  //           },
  //           error => {
  //             reject(error);
  //             try {
  //               this.common.loading.dismiss();
  //             } catch (err) { }
  //           }
  //         );
  //     });
  //   }
  // }


  get(link: string) {

    if (!this.checkNetwork()) {
      this.common.showToast("Sem conexão!");
    } else {

      const headers = new HttpHeaders().set("x-auth-token", localStorage.getItem("token"));

      return this.http.get<JSON>(link, { headers }).subscribe((result: any) => {
          console.log(result);
        }, (err) => {
          try {
            this.common.loading.dismiss();
          } catch (err) { }
          this.handleError(err);
        }
      );
    }
  }

  post(link: string, body: {}) {
    
    if (!this.checkNetwork()) {
      this.common.showToast("Sem conexão!");
    } else {

      const headers = new HttpHeaders().set("x-auth-token", localStorage.getItem("token"));

      this.http.post(link, body, { headers }).subscribe(
        (result: any) => {
          console.log(result);
        }, (err) => {
          try {
            this.common.loading.dismiss();
          } catch (err) { }
          this.handleError(err);
        }
      );
    }
  }


  private handleError(error: any) {
    try {
      this.common.loading.dismiss();
    } catch (err) { }
    this.common.showAlert(error.json().title, error.json().detail);
  }


}
