import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CalendarComponentOptions} from "ion2-calendar";
import * as moment from "moment";

@IonicPage()
@Component({
  selector: 'page-date-picker',
  templateUrl: 'date-picker.html',
})
export class DatePickerPage {
  date: string;
  type: 'moment';

  options: CalendarComponentOptions = {
    weekdays : ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    monthPickerFormat : ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ']
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
    moment.locale("de");
    this.date = this.navParams.data.date;
    console.log(this.date);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatePickerPage');
  }

  onChange($event) {
    console.log($event.locale("de"));
  }

  close() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.date);
  }
}
