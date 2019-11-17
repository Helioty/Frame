import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BaseCommon } from '../commons/base-common';
import { BaseService } from '../commons/services/base-service.service';
import { AuthService } from '../commons/services/auth-service.service';
import { AppConfig } from '../config/app.config';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Network } from "@ionic-native/network/ngx";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ENV } from '../environments/environment';
console.log(ENV.mode);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    AndroidFullScreen,
    AppConfig,
    AppVersion,
    AuthService,
    BarcodeScanner,
    StatusBar,
    SplashScreen,
    BaseCommon,
    BaseService,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
