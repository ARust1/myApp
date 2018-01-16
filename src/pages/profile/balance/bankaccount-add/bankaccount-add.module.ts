import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankaccountAddPage } from './bankaccount-add';

@NgModule({
  declarations: [
    BankaccountAddPage,
  ],
  imports: [
    IonicPageModule.forChild(BankaccountAddPage),
  ],
})
export class BankaccountAddPageModule {}
