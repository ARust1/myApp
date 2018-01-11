import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenaltyAddPage } from './penalty-add';

@NgModule({
  declarations: [
    PenaltyAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PenaltyAddPage),
  ],
})
export class PenaltyAddPageModule {}
