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
   * @description Cria o loop que da foco no input.
   */
  focusOn(): void {
    this.taskScanner = setInterval(() => {
      try {
        this.valorScanner = '';
        if (this.focusStatus) {
          const scanners = document.body.getElementsByClassName('scanner');
          for (const i in scanners) {
            if (Number(i) === scanners.length - 1) {
              (scanners[i] as HTMLInputElement).focus();
            }
          }
        }
      } catch (error) {}
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
    const scanners = document.body.getElementsByClassName('scanner');
    for (const i in scanners) {
      if (Number(i) === scanners.length - 1) {
        (scanners[i] as HTMLInputElement).blur();
      }
    }
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
