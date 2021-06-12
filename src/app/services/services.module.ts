import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CommonService } from './common/common.service';
import { DataService } from './data/data.service';
import { BaseService } from './http/base.service';
import { ProdutoService } from './produto/produto.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    BaseService,
    CommonService,
    DataService,
    ProdutoService
  ]
})
export class ServicesModule { }
