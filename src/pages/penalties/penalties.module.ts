import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenaltiesPage } from './penalties';

@NgModule({
  declarations: [
    PenaltiesPage,
  ],
  imports: [
    IonicPageModule.forChild(PenaltiesPage),
  ],
})
export class PenaltiesPageModule {}
