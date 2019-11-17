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

@Injectable()
export class AppConfig {

    private getApiUrl: string = '';
    private getApiUrlNode: string = '';

    constructor(
        public http: HttpClient,
    ) {
        // if (ENV.mode == 'Production') {
        //     this.getApiUrl = 'http://fcimbservices.ferreiracosta.local:8080/WS-Publico/getUrlService?apl=pv';
        //     this.getURL();
        //     getHTTP();
        // } else {
        //     API_URL = 'http://hmlfcimbservices.ferreiracosta.local:8585/';
        // }

        //  http://hmlfcimbservices.ferreiracosta.local:8585/WS-Publico/getVersao/2?arquivo=VersaoSFC.exe&tipo=S
        //  Net.showLog('MAIK RYUGE');
        //  Net.downloadJson();          

    }


    public getURL() {
        let apiUrl = this.getApiUrl;
        return new Promise(resolve => {
            this.http.get(apiUrl).subscribe(data => {
                console.log(data);
                let link: any = data;
                API_URL = link.server + '/';
                resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }

}
