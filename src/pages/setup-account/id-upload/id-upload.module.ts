import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdUploadPage } from './id-upload';

@NgModule({
  declarations: [
    IdUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(IdUploadPage),
  ],
})
export class IdUploadPageModule {}
