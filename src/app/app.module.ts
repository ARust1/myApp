import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, NavController} from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { EventsPage } from '../pages/events/events';
import { WalletPage } from '../pages/wallet/wallet';
import { TabsPage } from '../pages/tabs/tabs';

import { Clipboard } from '@ionic-native/clipboard';
import { CalendarModule } from "ion2-calendar";
import { IonicStorageModule } from '@ionic/storage';
import {DatePickerPage} from "../pages/events/event-modal/date-picker/date-picker";
import { Stripe } from '@ionic-native/stripe';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { HttpModule } from "@angular/http";
import { HomePage } from "../pages/home/home";
import {PenaltiesPage} from "../pages/penalties/penalties";
import {TeamPage} from "../pages/team/team";
import {ProfileModalPage} from "../pages/profile/profile-modal/profile-modal";
import {EventModalPage} from "../pages/events/event-modal/event-modal";
import {EventDetailPage} from "../pages/events/event-detail/event-detail";
import {TeamRequestPage} from "../pages/profile/team-request/team-request";
import {SetupAccountPage} from "../pages/setup-account/setup-account";
import {InviteLinkPopoverPage} from "../pages/profile/invite-link-popover/invite-link-popover";
import {Credentials} from "../providers/credentials";
import {EventInviteListPage} from "../pages/events/event-invite-list/event-invite-list";
import {AuthServiceProvider} from "../providers/auth-service";
import {GenericProvider} from "../providers/generic";
import {UserServiceProvider} from "../providers/user-service";
import {TeamServiceProvider} from "../providers/team-service";
import {EventServiceProvider} from "../providers/event-service";
import {InviteServiceProvider} from "../providers/invite-service";
import {FeedbackProvider} from "../providers/feedback";
import { EventInviteProvider } from '../providers/event-invite';
import {AccountPage} from "../pages/profile/account/account";
import {PaymentListPage} from "../pages/profile/account/payment-list/payment-list";
import {PayPopoverPage} from "../pages/pay-popover/pay-popover";
import { PaymentProvider } from '../providers/payment';
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONF} from "./app.firebase.config";
import {AngularFireAuthModule} from "angularfire2/auth";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SetupAccountPage,
    ProfilePage,
    EventsPage,
    PenaltiesPage,
    TeamPage,
    WalletPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfileModalPage,
    TeamRequestPage,
    InviteLinkPopoverPage,
    EventModalPage,
    EventDetailPage,
    DatePickerPage,
    EventInviteListPage,
    AccountPage,
    PaymentListPage,
    PayPopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CalendarModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true}),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONF),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SetupAccountPage,
    ProfilePage,
    EventsPage,
    PenaltiesPage,
    TeamPage,
    WalletPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfileModalPage,
    TeamRequestPage,
    InviteLinkPopoverPage,
    EventModalPage,
    EventDetailPage,
    DatePickerPage,
    EventInviteListPage,
    AccountPage,
    PaymentListPage,
    PayPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Clipboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Credentials,
    AuthServiceProvider,
    UserServiceProvider,
    TeamServiceProvider,
    EventServiceProvider,
    InviteServiceProvider,
    FeedbackProvider,
    GenericProvider,
    EventInviteProvider,
    Stripe,
    PaymentProvider
  ]
})
export class AppModule {}
