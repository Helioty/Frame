import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ScannerService } from 'src/app/shared/services/scanner/scanner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public readonly scanner: ScannerService,
    private readonly common: CommonService,
    private readonly menu: MenuController
  ) {}

  ngOnInit(): void {
    console.log('Home OnInit');
    this.menu.enable(true);
  }

  ionViewWillEnter(): void {
    this.scanner.focusOn();
    this.common.goToFullScreen();
  }

  ionViewDidEnter(): void {
    this.common.goToFullScreen();
  }

  ionViewWillLeave(): void {
    this.scanner.focusOff();
  }

  ionViewDidLeave(): void {}

  scaneado(value: string): void {
    this.common.showToast(`Scanner works: ${value}`);
  }
}
