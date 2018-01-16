import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Content, InfiniteScroll} from 'ionic-angular';
import {User} from "../../models/user-model";
import {BoardMessagesProvider} from "../../providers/board-messages";
import {BoardMessage} from "../../models/boardmessage-model";
import * as moment from "moment";
/**
 * Generated class for the DebtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  private userData: User;
  private boardMessages: BoardMessage[] = [];
  private message: string;
  private boardMessage: BoardMessage;
  private textArea: any;

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private boardMessageService: BoardMessagesProvider,
              public element:ElementRef) {
    moment.locale("de");
    this.userData = this.navParams.data;
    console.log(this.userData);

  }

  ngOnInit() {
    this.getBoardMessages();

  }

  ionViewWillEnter(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }

  ionViewDidLoad() {
    this.textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
  }

  getBoardMessages() {
    this.boardMessageService.getBoardMessagesByTeam(this.userData.team_id).subscribe(result => {
      this.boardMessages = result;
    }, err => {
      console.log(err);
    }, () => {
      this.scrollToBottom();
    })
  }

  addBoardMessage() {
    this.boardMessage = new BoardMessage();
    let date = new Date();
    this.boardMessage.team_id = this.userData.team_id;
    this.boardMessage.message = this.message;
    this.boardMessage.timestamp = date;
    console.log(this.boardMessage);
    this.boardMessageService.addBoardMessage(this.boardMessage).subscribe(result => {
      this.boardMessages.push(this.boardMessage);
      console.log(this.boardMessage);
    }, err => {
      console.log(err);
    }, () => {
      this.message = '';
      this.textArea.style.height = '38px';
      this.scrollToBottom();
    })
  }

}
