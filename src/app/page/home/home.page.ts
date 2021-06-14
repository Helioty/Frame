import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common/common.service';
import { ScannerService } from 'src/app/services/scanner/scanner.service';

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

  ngOnInit() {
    this.menu.enable(true);
  }

  ionViewWillEnter() {
    this.scanner.focusOn();
  }

  ionViewDidEnter() {}

  ionViewWillLeave() {
    this.scanner.focusOff();
  }

  ionViewDidLeave() {}

  scaneado(value: string) {}
}
