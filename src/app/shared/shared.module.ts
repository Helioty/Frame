import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideKeyboardDirective } from './custom/hide-keyboard.directive';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    HideKeyboardDirective,
    MenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HideKeyboardDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
