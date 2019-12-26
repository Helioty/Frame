import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { ENV } from '../environments/environment';

export let API_URL: any;
export let API_URL_NODE: any;

export function getHTTP(): any {
    return API_URL;
}
export function getHTTPNode(): any {
    return API_URL_NODE;
}

@Injectable({
    providedIn: 'root'
})

export class AppConfig {

    private getApiUrl: string = '';
    private getApiUrlNode: string = '';

    constructor(
        public http: HttpClient,
    ) {

        if (ENV.mode == 'Production') {

            this.getApiUrl = 'https://publico.api.imb/getUrlServiceOKD?apl=pv';
            this.getURL();
            getHTTP();

        } else {

            this.getApiUrl = 'https://publico.staging.imb/getUrlServiceOKD';
            this.getURL();
            getHTTP();

        }

    }


    public getURL() {
        let apiUrl = this.getApiUrl;
        return new Promise(resolve => {
            this.http.get(apiUrl).subscribe(data => {
                console.log(data);
                let link: any = data;
                API_URL = link.server + '/';
                resolve(data);
            }, error => {
                console.log(error);
            });
        });
    }

    public getURLNode() {
        let apiUrl = this.getApiUrlNode;
        return new Promise(resolve => {
            this.http.get(apiUrl).subscribe(data => {
                console.log(data);
                let link: any = data;
                API_URL_NODE = link.server + '/';
                resolve(data);
            }, error => {
                console.log(error);
            });
        });
    }

}
