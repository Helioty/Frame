import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHideKeyboard]',
})
export class HideKeyboardDirective {
  private readonly: boolean;
  constructor(private el: ElementRef) {
    this.readonly = true;
    this.setReadOnly(this.readonly);

    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 500);
  }

  @HostListener('focus') onFocus() {
    this.readonly = true;
    this.setReadOnly(this.readonly);

    if (!this.readonly) {
      this.setReadOnly(!this.readonly);
    }
    setTimeout(() => {
      this.readonly = false;
      this.setReadOnly(this.readonly);
    }, 100);
  }

  @HostListener('click', ['$event.target']) onClick() {
    this.readonly = true;
    this.setReadOnly(this.readonly);

    setTimeout(() => {
      this.readonly = false;
      this.setReadOnly(this.readonly);
      this.el.nativeElement.focus();
    }, 500);
  }

  private setReadOnly(value: boolean): void {
    this.el.nativeElement.readOnly = value;
    if (this.el.nativeElement.children && this.el.nativeElement.children.length > 0) {
      this.el.nativeElement.children[0].readOnly = value;
      this.el.nativeElement.children[1].readOnly = value;
    }
  }
}
