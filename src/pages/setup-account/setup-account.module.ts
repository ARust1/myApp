import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetupAccountPage } from './setup-account';

@NgModule({
  declarations: [
    SetupAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(SetupAccountPage),
  ],
})
export class SetupAccountPageModule {}
