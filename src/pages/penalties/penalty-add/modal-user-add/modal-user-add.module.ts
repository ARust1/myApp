import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalUserAddPage } from './modal-user-add';

@NgModule({
  declarations: [
    ModalUserAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalUserAddPage),
  ],
})
export class ModalUserAddPageModule {}
