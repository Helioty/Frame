import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseCommon } from '../base-common';

// import { require } from 'request';

@Injectable({
  providedIn: 'root'
})

export class HTMLToPDFAPIService {

  private ApiKey = "api_9472C6123CEC4DD2BF4123D75FF9A9AF";

  constructor(
    public http: HttpClient,
    public common: BaseCommon
  ) {
    
  }

  api() {
    // const request = require('request');
    // const fs = require('fs');

    // let opts = {
    //   uri: 'https://api.sejda.com/v2/html-pdf',
    //   headers: {
    //     'Authorization': 'Token: ' + this.ApiKey,
    //   },
    //   json: {
    //     'url': 'https://example.com',
    //     'viewportWidth': 1200
    //   }
    // };

    // request.post(opts)
    //   .on('error', function (err) {
    //     return console.error(err);
    //   })
    //   .on('response', function (response) {
    //     if (response.statusCode === 200) {
    //       response.pipe(fs.createWriteStream('/tmp/out.pdf'))
    //         .on('finish', function () {
    //           console.log('PDF saved to disk');
    //         });
    //     } else {
    //       return console.error('Got code: ' + response.statusCode);
    //     }
    //   });

  }
}
