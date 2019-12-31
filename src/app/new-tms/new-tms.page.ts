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
  }, {
    encarregado: 'DISTRIBUIÇÃO',
    estoque: 100
  }, {
    encarregado: 'SA',
    estoque: 30
  }];

  public toggleTeste: boolean = false;

  public qtdEntrega = 0;

  public teste;
  public opcaoSelecionada;

  public indexSeller: number;
  
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


  validaNumero(qtd: any) {
    let max = 9999;
    let running: boolean = false;

    //Para evitar conflito entre o blur e o keyup
    if (running) return;

    //Bloqueia multiplas chamadas do blur e keyup
    running = true;

    //Se o input for maior que max ele irá fixa o valor maximo no value
    if (parseFloat(qtd) > max) {
      this.qtdEntrega = max;
    }

    //Habilita novamente as chamadas do blur e keyup
    running = false;
  }

  mee(A: any, I: any) {
    this.indexSeller = I;
    console.log(this.teste)
    console.log(this.opcaoSelecionada)
    console.log(A)
    console.log(this.dados[I])
  }

}
