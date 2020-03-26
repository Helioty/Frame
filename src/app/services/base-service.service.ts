import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common/common.service';
import { environment } from 'src/environments/environment';

import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private http: HttpClient,
    private common: CommonService
  ) { }

  get(link: string): Promise<any> {
    const headers = new HttpHeaders().set('x-auth-token', localStorage.getItem('token'));

    return new Promise((resolve, reject) => {
      this.http.get<JSON>(link, { headers }).subscribe((result: any) => {
        resolve(result);
      }, (error) => {
        this.showError(error);
        reject(error);
      });
    });

  }

  getNoShowError(link: string): Promise<any> {
    const headers = new HttpHeaders().set('x-auth-token', localStorage.getItem('token'));

    return new Promise((resolve, reject) => {
      this.http.get<JSON>(link, { headers }).subscribe((result: any) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });

  }

  post(link: string, body: any): Promise<any> {
    const headers = new HttpHeaders().set('x-auth-token', localStorage.getItem('token'));

    return new Promise((resolve, reject) => {
      this.http.post(link, body, { headers }).subscribe((result: any) => {
        resolve(result);
      }, (error) => {
        this.showError(error);
        reject(error);
      });
    });

  }

  showError(error: any) {
    console.log(error);
    // by Ryuge 28/11/2019
    // edit by Helio 18/03/2020
    if (error.status === 400) {
      if (error.error.detail) {
        this.common.showAlert(error.error.title, error.error.detail);
      } else {
        if (environment.production) {
          this.common.showAlert('Atenção!', 'Sem serviço, entrar em contato com suporte.');
        } else {
          this.common.showAlert('Atenção!', JSON.stringify(error));
        }
      }
    } else if (error.status === 503) {
      if (error.error.detail) {
        this.common.showAlert(error.error.title, error.error.detail);
      } else {
        if (environment.production) {
          this.common.showAlert('Atenção!', 'Sem serviço, entrar em contato com suporte.');
        } else {
          this.common.showAlert('Atenção!', JSON.stringify(error));
        }
      }
    } else if (error.status === 0) {
      this.common.showAlert(error.statusText, error.message);
    } else {
      if (error.error.detail) {
        this.common.showAlert(error.error.title, error.error.detail);
      } else {
        if (environment.production) {
          this.common.showAlert('Atenção!', 'Sem serviço, entrar em contato com suporte.');
        } else {
          this.common.showAlert('Atenção!', JSON.stringify(error));
        }
      }
    }
  }

}
