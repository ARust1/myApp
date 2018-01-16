import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferPopoverPage } from './transfer-popover';

@NgModule({
  declarations: [
    TransferPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferPopoverPage),
  ],
})
export class TransferPopoverPageModule {}
