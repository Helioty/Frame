import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppConfigService } from 'src/app/config/app.config.service';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { ComponentsModule } from './shared/components/components.module';
import { SharedModule } from './shared/shared.module';
console.log(environment.production ? 'Production' : 'Development');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ComponentsModule,
    ServicesModule,
    SharedModule
  ],
  providers: [
    AppConfigService,
    AndroidFullScreen,
    NavigationBar,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
