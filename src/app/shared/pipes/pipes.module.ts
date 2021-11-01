import { NgModule } from '@angular/core';
import { FormatarStringPipe } from './formatar-string.pipe';

@NgModule({
  declarations: [FormatarStringPipe],
  exports: [FormatarStringPipe],
})
export class PipesModule {}
