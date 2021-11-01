import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormErrorComponent } from './form-error/form-error.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [FormErrorComponent, MenuComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [FormErrorComponent, MenuComponent],
})
export class ComponentsModule {}
