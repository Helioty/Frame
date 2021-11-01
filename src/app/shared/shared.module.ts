import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CustomModule } from './custom/custom.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [CommonModule, CustomModule, PipesModule],
  exports: [CustomModule, PipesModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
