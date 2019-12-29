import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-new-tms',
  templateUrl: './new-tms.page.html',
  styleUrls: ['./new-tms.page.scss'],
})
export class NewTMSPage implements OnInit {

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  public slideOpts = {
    slidesPerView: 1,
    initialSlide: 0,
    autoHeight: true
  };

  public dados: any = [{
    encarregado: 'LOJA',
    estoque: 10
  },{
    encarregado: 'DISTRIBUIÇÃO',
    estoque: 100
  },{
    encarregado: 'SA',
    estoque: 30
  }];

  public toggleTeste: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  aqui() {
    console.log("aqui")
    console.log(this.slideOpts)
  }

  goToSlide(sln: string) {
    switch (sln) {
      case "opcsEntrega":
        // this.slides.slideNext()
        this.slides.slideTo(1)
        break;
    
      default:
        break;
    }
  }
}
