import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamSetupPage } from './team-setup';

@NgModule({
  declarations: [
    TeamSetupPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamSetupPage),
  ],
})
export class TeamSetupPageModule {}
