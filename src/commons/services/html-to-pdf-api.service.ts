import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseCommon } from '../base-common';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { promise } from 'protractor';

// import { request } from 'require';


@Injectable({
  providedIn: 'root'
})

export class HTMLToPDFAPIService {

  private ApiKey = "api_9472C6123CEC4DD2BF4123D75FF9A9AF";

  public resultOfPDF: any;

  constructor(
    public http: HttpClient,
    public common: BaseCommon,
  ) {

  }

  async api(json: any) {
    this.common.showLoader()
    let url = 'http://10.131.9.81:8080/pdf';

    const headers = new HttpHeaders().set('Content-type', 'application/json')

    this.http.post<JSON>(url, json, { headers: headers }).subscribe(result => {
      console.log(result);
      this.resultOfPDF = result;
      this.common.loading.dismiss();
      if (this.resultOfPDF.status == 200) {
        this.common.showAlert(this.resultOfPDF.title, this.resultOfPDF.text)
      }
    }, (error) => {
      console.log(error)
      this.common.loading.dismiss();
      alert(error.message)
    });
    // let result: any = await this.callServer(url, json)
    // return result
  }

  async callServer(url: string, json: any) {
    const headers = new HttpHeaders().set('Content-type', 'application/json')

    this.http.post<JSON>(url, json, { headers: headers }).subscribe(result => {
      console.log(result);
      let s: any = result;
      this.common.loading.dismiss();
      if (s.status == 200) {
        this.common.showAlert(s.title, s.text)
      }
      return result
    }, (error) => {
      console.log(error)
      this.common.loading.dismiss();
      alert(error.message)
    });
  }

}






// this.ionhttp.get('http://ionic.io', {}, {})
    //   .then(data => {
    //     console.log(data)
    //     // console.log(data.status);
    //     // console.log(data.data); // data received by server
    //     // console.log(data.headers);

    //   })
    //   .catch(error => {

    //     console.log(error)
    //     // console.log(error.status);
    //     // console.log(error.error); // error message as string
    //     // console.log(error.headers);

    //   });

    // var http = new XMLHttpRequest();
    // // var url = 'get_data.php';
    // // var params = 'orem=ipsum&name=binny';
    // http.open('POST', url, true);

    // //Send the proper header information along with the request
    // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // http.onreadystatechange = function () {//Call a function when the state changes.
    //   if (http.readyState == 4 && http.status == 200) {
    //     alert(http.responseText);
    //   }
    // }
    // http.send();
