import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventInviteListPage } from './event-invite-list';

@NgModule({
  declarations: [
    EventInviteListPage,
  ],
  imports: [
    IonicPageModule.forChild(EventInviteListPage),
  ],
})
export class EventInviteListPageModule {}
