import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ToPDFPagePage } from './to-pdf-page.page';

const routes: Routes = [
  {
    path: '',
    component: ToPDFPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ToPDFPagePage]
})
export class ToPDFPagePageModule {}
