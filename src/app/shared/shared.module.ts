import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HideKeyboardDirective } from './custom/hide-keyboard.directive';
import { ScrollOnFocusDirective } from './custom/scroll-on-focus.directive';

@NgModule({
  declarations: [HideKeyboardDirective, ScrollOnFocusDirective],
  imports: [CommonModule],
  exports: [HideKeyboardDirective, ScrollOnFocusDirective],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
