import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { MessagedataService } from "../../services/messagedata.service";


@Component({
  selector: "app-tracker",
  templateUrl: "./tracker.page.html",
  styleUrls: ["./tracker.page.scss"],
})
export class TrackerPage implements OnInit {
  scheduled = [];
  MessageTS: any;

  constructor(
    private alertCtrl: AlertController,
    private plt: Platform,
    private MessageData: MessagedataService,
    private navCtrl: NavController
  ) {}

  help() {
    this.navCtrl.navigateRoot("/slides");
  }

  ngOnInit() {
    this.MessageData.$getObjectSource
      .subscribe((data) => {
        this.MessageTS = data;
      })
      .unsubscribe();
  }
}