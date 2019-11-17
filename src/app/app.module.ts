import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BaseCommon } from '../commons/base-common';
import { AppConfig } from '../config/app.config';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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
    StatusBar,
    SplashScreen,
    BaseCommon,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
