import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayPopoverPage } from './pay-popover';

@NgModule({
  declarations: [
    PayPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(PayPopoverPage),
  ],
})
export class PayPopoverPageModule {}
