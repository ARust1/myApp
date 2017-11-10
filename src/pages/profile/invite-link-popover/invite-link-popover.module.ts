import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InviteLinkPopoverPage } from './invite-link-popover';

@NgModule({
  declarations: [
    InviteLinkPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteLinkPopoverPage),
  ],
})
export class InviteLinkPopoverPageModule {}
