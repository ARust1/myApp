import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidateAccountPage } from './validate-account';

@NgModule({
  declarations: [
    ValidateAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(ValidateAccountPage),
  ],
})
export class ValidateAccountPageModule {}
