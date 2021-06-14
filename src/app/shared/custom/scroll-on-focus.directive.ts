import { Directive, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollOnFocus]',
})
export class ScrollOnFocusDirective {
  private marginOld: string;
  private readonly newMargin = '50vh';
  constructor(private readonly ren: Renderer2) {}

  @HostListener('ionFocus', ['$event.target']) ionFocus(target: HTMLIonInputElement) {
    this.marginOld = target.parentElement.style.marginBottom;
    this.ren.setStyle(target.parentElement, 'margin-bottom', this.newMargin);
    setTimeout(() => {
      target.scrollTo();
    }, 300);
  }

  @HostListener('ionBlur', ['$event.target']) ionBlur(target: HTMLIonInputElement) {
    this.ren.setStyle(target.parentElement, 'margin-bottom', this.marginOld);
  }

  @HostListener('focus', ['$event.target']) onFocus(target: HTMLInputElement) {
    this.marginOld = target.style.marginBottom;
    this.ren.setStyle(target, 'margin-bottom', this.newMargin);
    setTimeout(() => {
      target.scrollTo();
    }, 300);
  }

  @HostListener('focusout', ['$event.target']) onBlur(target: HTMLInputElement) {
    this.ren.setStyle(target, 'margin-bottom', this.marginOld);
  }
}
