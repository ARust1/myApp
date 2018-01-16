import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {DepositCreatePage} from './deposit-create';

@NgModule({
  declarations: [
    DepositCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DepositCreatePage),
  ],
})
export class DepositCreatePageModule {}
