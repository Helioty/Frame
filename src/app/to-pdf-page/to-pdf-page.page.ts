import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { HTMLToPDFAPIService } from '../../commons/services/html-to-pdf-api.service';

import { BaseCommon } from 'src/commons/base-common';

@Component({
  selector: 'app-to-pdf-page',
  templateUrl: './to-pdf-page.page.html',
  styleUrls: ['./to-pdf-page.page.scss'],
})
export class ToPDFPagePage implements OnInit {

  public siteUrl: string = "";
  public formato: string = "";
  public pageOrientation: string = "";
  
  public opcsFormato = ['a0', 'a1', 'a2', 'a3', 'a4', 'a5']
  public opcsOrientation = ['auto', 'landscape', 'portrait']

  

  
  public customActionSheetOptions: any = {
    header: 'Formato de impressão',
    // subHeader: 'Select your favorite color'
  };

  constructor(
    public alertController: AlertController,
    public toPDF: HTMLToPDFAPIService,
    public common: BaseCommon, 
    ) { }

  ngOnInit() {
    // this.common.showLoader()
    // let result = this.toPDF.api()
    // console.log(result)
  }

  async clickToGenerate() {
    try {
      this.options()
    } catch (error) {
      console.error(error)
    }
  }

  async options() {
    let json: any = {
      uri: 'https://api.sejda.com/v2/html-pdf',
      headers: {
        'Authorization': 'Token: ' + 'api_9472C6123CEC4DD2BF4123D75FF9A9AF',
      },
      json: {
        'url': this.siteUrl,
        'viewportWidth': 2560,
        'pageSize': this.formato,
        'pageOrientation': this.pageOrientation
      }
    }
    await this.toPDF.api(json)
  }


  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Radio',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Radio 1',
          value: 'value1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Radio 2',
          value: 'value2'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Radio 3',
          value: 'value3'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Radio 4',
          value: 'value4'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Radio 5',
          value: 'value5'
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
          value: 'value6'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }



  // @ViewChild('screen', {static: false}) screen: ElementRef;
  // @ViewChild('canvas', {static: false}) canvas: ElementRef;
  // @ViewChild('downloadLink', {static: false}) downloadLink: ElementRef;

  // downloadImage(){
  //   html2canvas(this.screen.nativeElement).then(canvas => {
  //     this.canvas.nativeElement.src = canvas.toDataURL();
  //     this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
  //     this.downloadLink.nativeElement.download = 'marble-diagram.png';
  //     this.downloadLink.nativeElement.click();
  //   });
  // }

  consol() {
    console.log(this.toPDF.resultOfPDF)
    console.log(this.formato)
  }

}
