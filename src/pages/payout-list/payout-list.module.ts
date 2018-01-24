import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayoutListPage } from './payout-list';

@NgModule({
  declarations: [
    PayoutListPage,
  ],
  imports: [
    IonicPageModule.forChild(PayoutListPage),
  ],
})
export class PayoutListPageModule {}
