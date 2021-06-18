import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { FormErrorComponent } from './form-error/form-error.component';

@NgModule({
  declarations: [MenuComponent, FormErrorComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [MenuComponent, FormErrorComponent],
})
export class ComponentsModule {}
