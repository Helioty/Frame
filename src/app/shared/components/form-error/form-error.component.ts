import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent {
  @Input() errorMessage: string;
  @Input() showError: boolean;
  @Input() colorWhite = false;

  constructor() {}
}
