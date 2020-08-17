import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public valorScanner: string;
  private focusStatus = true;
  private taskScanner: any;

  constructor(private common: CommonService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.focusOn();
    this.common.goToFullScreen();
  }

  ionViewDidEnter() {
    this.common.goToFullScreen();
  }

  ionViewWillLeave() {
    this.focusOff();
  }

  ionViewDidLeave() { }

  // Cria o loop que da foco no input
  focusOn() {
    this.taskScanner = setInterval(() => {
      try {
        this.valorScanner = '';
        if (this.focusStatus) {
          const scanners = document.body.getElementsByClassName('scanner');
          for (const i in scanners) {
            if (Number(i) === (scanners.length - 1)) {
              (<HTMLInputElement>scanners[i]).focus();
            }
          }
        }
      } catch (error) { }
    }, 350);
  }

  focusPlay() {
    this.focusStatus = true;
  }

  focusPause() {
    this.focusStatus = false;
    const scanners = document.body.getElementsByClassName('scanner');
    for (const i in scanners) {
      if (Number(i) === (scanners.length - 1)) {
        (<HTMLInputElement>scanners[i]).blur();
      }
    }
  }

  // Encerra o loop de foco no input
  focusOff() {
    clearInterval(this.taskScanner);
  }

  scaneado(evento: any) { }

}
