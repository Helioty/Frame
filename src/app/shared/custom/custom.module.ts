import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideKeyboardDirective } from './hide-keyboard/hide-keyboard.directive';

@NgModule({
  declarations: [HideKeyboardDirective],
  imports: [CommonModule],
  exports: [HideKeyboardDirective],
})
export class CustomModule {}
