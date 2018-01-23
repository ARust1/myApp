import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayoutCreatePage } from './payout-create';

@NgModule({
  declarations: [
    PayoutCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(PayoutCreatePage),
  ],
})
export class PayoutCreatePageModule {}
