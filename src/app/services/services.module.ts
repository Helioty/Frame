import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth/auth.service';
import { BaseService } from './base-service.service';
import { CommonService } from './common/common.service';
import { DataService } from './data/data.service';
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
