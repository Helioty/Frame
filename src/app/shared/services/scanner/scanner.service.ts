import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  public valorScanner: string;
  public focusStatus = true;
  private taskScanner: any;

  constructor() {}

  /**
   * @author helio.souza
   * @description Retorna o ultimo scanner renderizado no DOM.
   * @returns HTMLInputElement.
   */
  getScannerElement(): HTMLInputElement {
    const scanners = document.body.getElementsByClassName('scanner');
    return scanners[scanners.length - 1] as HTMLInputElement;
  }

  /**
   * @author helio.souza
   * @description Cria o loop que da foco no input.
   */
  focusOn(): void {
    this.taskScanner = setInterval(() => {
      this.valorScanner = '';
      if (this.focusStatus) {
        try {
          this.getScannerElement().focus();
        } catch (error) {}
      }
    }, 350);
  }

  /**
   * @author helio.souza
   * @description Altera o status do foco para TRUE.
   */
  focusPlay(): void {
    this.focusStatus = true;
  }

  /**
   * @author helio.souza
   * @description Altera o status do foco para FALSE.
   */
  focusPause(): void {
    this.focusStatus = false;
    try {
      this.getScannerElement().blur();
    } catch (error) {}
  }

  /**
   * @author helio.souza
   * @description Encerra o loop de foco no input.
   */
  focusOff(): void {
    try {
      clearInterval(this.taskScanner);
    } catch (error) {}
  }
}
