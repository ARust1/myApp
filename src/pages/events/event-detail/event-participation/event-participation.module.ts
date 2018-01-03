import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventParticipationPage } from './event-participation';

@NgModule({
  declarations: [
    EventParticipationPage,
  ],
  imports: [
    IonicPageModule.forChild(EventParticipationPage),
  ],
})
export class EventParticipationPageModule {}
