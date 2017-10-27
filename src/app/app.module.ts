import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { EventsPage } from '../pages/events/events';
import { WalletPage } from '../pages/wallet/wallet';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { HttpModule } from "@angular/http";
import { HomePage } from "../pages/home/home";
import {PenaltiesPage} from "../pages/penalties/penalties";
import {DebtPage} from "../pages/debt/debt";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    EventsPage,
    PenaltiesPage,
    DebtPage,
    WalletPage,
    TabsPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    EventsPage,
    PenaltiesPage,
    DebtPage,
    WalletPage,
    TabsPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
