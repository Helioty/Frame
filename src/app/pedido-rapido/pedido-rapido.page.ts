import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido-rapido',
  templateUrl: './pedido-rapido.page.html',
  styleUrls: ['./pedido-rapido.page.scss'],
})
export class PedidoRapidoPage implements OnInit {

  public itens = [{
    nome: 'TV',
    qtd: 2
  }, {
    nome: 'Geladeira',
    qtd: 1
  }, {
    nome: 'Furadeira',
    qtd: 1
  }, {
    nome: 'Cama',
    qtd: 2
  }, {
    nome: 'Ventilador',
    qtd: 3
  }];

  constructor() {
    const el = document.querySelector('.item-inner');
    console.log(el)
    // el.style.setProperty('--background', '#36454f');
  }

  ngOnInit() {
    console.log(this.itens)
  }

}
