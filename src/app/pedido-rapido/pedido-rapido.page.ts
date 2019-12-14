import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido-rapido',
  templateUrl: './pedido-rapido.page.html',
  styleUrls: ['./pedido-rapido.page.scss'],
})
export class PedidoRapidoPage implements OnInit {

  public itens = [{
    nome: 'TV',
    qtd: 2,
    preco: 1999
  }, {
    nome: 'Geladeira',
    qtd: 1,
    preco: 1499
  }, {
    nome: 'Furadeira',
    qtd: 1,
    preco: 199
  }, {
    nome: 'Cama',
    qtd: 2,
    preco: 259
  }, {
    nome: 'Ventilador',
    qtd: 3,
    preco: 119
  }];

  constructor() { }

  ngOnInit() {
    console.log(this.itens)
  }

  add(id: any) {
    this.itens[id].qtd++
  }

  rm(id: any) {
    this.itens[id].qtd--
  }
}
