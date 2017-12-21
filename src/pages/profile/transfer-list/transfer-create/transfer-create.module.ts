import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferCreatePage } from './transfer-create';

@NgModule({
  declarations: [
    TransferCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TransferCreatePage),
  ],
})
export class TransferCreatePageModule {}
