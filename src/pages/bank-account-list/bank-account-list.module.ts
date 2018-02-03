import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankAccountListPage } from './bank-account-list';

@NgModule({
  declarations: [
    BankAccountListPage,
  ],
  imports: [
    IonicPageModule.forChild(BankAccountListPage),
  ],
})
export class BankAccountListPageModule {}
