import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ActionSheetController} from 'ionic-angular';
import { PenaltyAddPage } from './penalty-add/penalty-add';
import { User } from '../../models/user-model';
import { PenaltyProvider } from '../../providers/penalty';
import { Penalty } from '../../models/penalty-model';
import { Events } from 'ionic-angular/util/events';
import {UserServiceProvider} from "../../providers/user-service";
import {PayPopoverPage} from "../pay-popover/pay-popover";
import {TeamServiceProvider} from "../../providers/team-service";
import {FeedbackProvider} from "../../providers/feedback";

@IonicPage()
@Component({
  selector: 'page-penalties',
  templateUrl: 'penalties.html',
})
export class PenaltiesPage {

  private userData: User;
  private penaltyList: Penalty[];
  private list: Penalty[] = [];
  private stripeAccountBalance: number;
  private penaltyDeleteData: Penalty;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private penaltyService: PenaltyProvider,
              private userService: UserServiceProvider,
              private teamService: TeamServiceProvider,
              private feedbackService: FeedbackProvider,
              private actionSheetCtrl: ActionSheetController,
              public events: Events) {
    this.userData = this.navParams.data;
    this.events.subscribe('penalty:created', (penaltyData: Penalty) => {
      this.list.push(penaltyData);
      console.log("penalty added " + penaltyData);
    });
    this.stripeAccountBalance = Number.parseInt(localStorage.getItem('userStripeBalance'));
  }

  ngOnInit() {
    if(this.userData.admin) {
      this.getPenaltiesByTeam();
    } else {
      this.getPenaltiesByUserId();
    }

  }


  goToAddPenalty() {
    this.navCtrl.push(PenaltyAddPage, {
      userData: this.userData
    })
  }

  getPenaltiesByTeam() {
    this.penaltyService.getPenaltiesByTeam(this.userData.team_id).subscribe(result => {
      this.penaltyList = result;
    }, err => {
      console.log(err);
    }, () => {
      this.penaltyList.forEach((penalty: Penalty) => {
        this.userService.getUserById(penalty.user_id).subscribe(result => {
          let penaltyData: any = {
            uuid: penalty.uuid,
            name: penalty.name,
            team_id: penalty.team_id,
            amount: penalty.amount,
            paid: penalty.paid,
            paymentMethod: penalty.payment_method,
            dateOfPayment: penalty.date_of_payment,
            user: result
          };
          this.list.push(penaltyData);
        }, err => {
          console.log(err);
        }, () => {
          console.log(this.list);
        })
      })
    })
  }

  getPenaltiesByUserId() {
    this.penaltyService.getPenaltiesByUserId(this.userData.uuid).subscribe(result => {
      this.penaltyList = result;
    }, err => {
      console.log(err);
    }, () => {
      this.penaltyList.forEach((penalty: Penalty) => {
        this.userService.getUserById(penalty.user_id).subscribe(result => {
          let penaltyData: any = {
            uuid: penalty.uuid,
            name: penalty.name,
            team_id: penalty.team_id,
            amount: penalty.amount,
            paid: penalty.paid,
            paymentMethod: penalty.payment_method,
            dateOfPayment: penalty.date_of_payment,
            user: result
          };
          this.list.push(penaltyData);
        }, err => {
          console.log(err);
        }, () => {
          console.log(this.list);
        })
      })
    })
  }

  openPayPopover(penaltyData: Penalty) {
    console.log(this.userData);
    let popover = this.popoverCtrl.create(PayPopoverPage, {
      userData: this.userData,
      penaltyData: penaltyData,
      stripeAccountBalance: this.stripeAccountBalance
    });
    popover.present();

    popover.onDidDismiss(data => {
      if(data) {
        console.log(data);
      }
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  acceptPayment(penaltyData: Penalty) {
    this.penaltyService.acceptPenaltyPayment(penaltyData.uuid).subscribe((result: any) => {
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.teamService.updateTeamBalance(this.userData.team_id, penaltyData.amount).subscribe((result: any) => {
        this.feedbackService.presentToast("Bezahlung akzeptiert. Es wurden " + penaltyData.amount + "€ in die Mannschaftskasse eingezahlt.", 1500, 'middle');
        penaltyData.paid = true;
        penaltyData.payment_method = 0;
      }, (err: any) => {
        console.log(err);
      }, () => {
        console.log(penaltyData);
        this.events.publish('penalty:paid', penaltyData);
      })
    });
  }

  private deleteAlertButtons = [
    {
      text: 'Abbrechen',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Löschen',
      handler: () => {
        this.deletePenalty(this.penaltyDeleteData);
      }
    }
  ];

  deleteAlert(penaltyData: Penalty) {
    this.penaltyDeleteData = penaltyData;
    let title: string = "Zahlung";
    let message: string = "Sind Sie sicher, dass Sie den Ausflug bar bezahlen wollen?";
    this.feedbackService.presentConfirmAlert(this.deleteAlertButtons, title, message);
  }

  openPenaltyOptions(penaltyData: Penalty) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Optionen',
      buttons: [
        {
          text: 'Strafe löschen',
          handler: () => {
            this.deleteAlert(penaltyData);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  deletePenalty(penaltyData: Penalty) {
    this.penaltyService.deletePenalty(penaltyData.uuid).subscribe(result => {
      this.list.splice(this.list.indexOf(penaltyData), 1);
    }, err => {
      console.log(err);
    })
  }
}
