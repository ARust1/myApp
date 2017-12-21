import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransfersPage } from './transfer-list';

@NgModule({
  declarations: [
    TransfersPage,
  ],
  imports: [
    IonicPageModule.forChild(TransfersPage),
  ],
})
export class TransfersPageModule {}
