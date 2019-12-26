import { Component, OnInit } from '@angular/core';

import { HTMLToPDFAPIService } from '../../commons/services/html-to-pdf-api.service';

@Component({
  selector: 'app-to-pdf-page',
  templateUrl: './to-pdf-page.page.html',
  styleUrls: ['./to-pdf-page.page.scss'],
})
export class ToPDFPagePage implements OnInit {

  constructor(public toPDF: HTMLToPDFAPIService) { }

  ngOnInit() {
    this.toPDF.api()
  }

}
