import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CommonService } from './common/common.service';
import { BaseService } from './http/base.service';
import { ProdutoService } from './produto/produto.service';
import { ScannerService } from './scanner/scanner.service';
import { UpdateService } from './update/update.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    AuthService,
    BaseService,
    CommonService,
    ProdutoService,
    ScannerService,
    UpdateService,
  ],
})
export class ServicesModule {}
