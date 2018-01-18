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
import {BalancePage} from "../pages/profile/balance/balance";
import {DepositCreatePage} from "../pages/profile/balance/deposit-create/deposit-create";
import {TransferCreatePage} from "../pages/profile/balance/transfer-create/transfer-create";
import { SearchProvider } from '../providers/search';
import {TransferPopoverPage} from "../pages/profile/balance/transfer-create/transfer-popover/transfer-popover";
import {EventParticipationPage} from "../pages/events/event-detail/event-participation/event-participation";
import { Camera } from '@ionic-native/camera';
import {ImagePicker} from "@ionic-native/image-picker";
import {DatePicker} from "@ionic-native/date-picker";
import {IdUploadPage} from "../pages/setup-account/id-upload/id-upload";
import {AngularGooglePlaceModule} from "angular-google-place";
import {TeamSetupPage} from "../pages/setup-account/team-setup/team-setup";
import { PictureProvider } from '../providers/picture';
import {Keyboard} from "@ionic-native/keyboard";
import { PenaltyProvider } from '../providers/penalty';
import { PenaltyAddPage } from '../pages/penalties/penalty-add/penalty-add';
import { ModalUserAddPage } from '../pages/penalties/penalty-add/modal-user-add/modal-user-add';
import {AutosizeDirective} from "../directives/autosize/autosize";
import { BoardMessagesProvider } from '../providers/board-messages';
import {BankaccountAddPage} from "../pages/profile/balance/bankaccount-add/bankaccount-add";
import {PaySelectPage} from "../pages/wallet/pay-select/pay-select";
import { TransactionProvider } from '../providers/transaction';

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
    InviteLinkPopoverPage,
    EventModalPage,
    EventDetailPage,
    EventParticipationPage,
    DatePickerPage,
    EventInviteListPage,
    AccountPage,
    PaymentListPage,
    PayPopoverPage,
    BalancePage,
    DepositCreatePage,
    TransferCreatePage,
    TransferPopoverPage,
    IdUploadPage,
    TeamSetupPage,
    PenaltyAddPage,
    ModalUserAddPage,
    BankaccountAddPage,
    AutosizeDirective,
    PaySelectPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CalendarModule,
    IonicModule.forRoot(MyApp, {
      activator: "highlight",
      swipeBackEnabled: true,
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back-outline',
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      tabsHideOnSubPages: true,
      pageTransition: 'ios-transition',
      iconMode: 'ios'
    }),
    IonicStorageModule.forRoot(),
    AngularGooglePlaceModule
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
    InviteLinkPopoverPage,
    EventModalPage,
    EventDetailPage,
    EventParticipationPage,
    DatePickerPage,
    EventInviteListPage,
    AccountPage,
    PaymentListPage,
    PayPopoverPage,
    BalancePage,
    DepositCreatePage,
    TransferCreatePage,
    TransferPopoverPage,
    IdUploadPage,
    TeamSetupPage,
    PenaltyAddPage,
    ModalUserAddPage,
    BankaccountAddPage,
    PaySelectPage
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
    PaymentProvider,
    SearchProvider,
    Camera,
    ImagePicker,
    DatePicker,
    PictureProvider,
    Keyboard,
    PenaltyProvider,
    BoardMessagesProvider,
    TransactionProvider
  ]
})
export class AppModule {}
