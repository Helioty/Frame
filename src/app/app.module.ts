import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HideKeyboardModule } from 'hide-keyboard';
import { ReactiveFormsModule } from '@angular/forms';

import { AppConfigService } from 'src/app/config/app.config.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ENV, environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ServicesModule } from './services/services.module';
console.log(ENV.mode);


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HideKeyboardModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ServicesModule
  ],
  providers: [
    AndroidFullScreen,
    AppConfigService,
    AppVersion,
    StatusBar,
    SplashScreen,
    Network,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
