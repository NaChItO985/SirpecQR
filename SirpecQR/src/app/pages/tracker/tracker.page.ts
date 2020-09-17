import { Component, OnInit } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from "@ionic-native/local-notifications/ngx";
import { AlertController, Platform } from '@ionic/angular';



@Component({
  selector: "app-tracker",
  templateUrl: "./tracker.page.html",
  styleUrls: ["./tracker.page.scss"],
})
export class TrackerPage implements OnInit {
  scheduled =[];
  
  constructor(
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private plt: Platform
  ) {
    this.plt.ready().then(()=>{
      this.localNotifications.on('click').subscribe(res=>{
        console.log('click', res);
        let msg = res.data ? res.data.mydata: '';
        this.showAlert(res.title, res.text, msg );
      });
      this.localNotifications.on('trigger').subscribe(res=>{
        console.log("trigger", res);
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
    })

  }

  ngOnInit() {

  }

  scheduleNotification(){
    this.localNotifications.schedule({
      id:1,
      title: 'Attention',
      text: 'Simons Notification',
      data: { mydata: 'My hidden message this is' },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND}
    })
  }
  recurringNotification(){
    this.localNotifications.schedule({
      id: 2,
      title: 'Recurring',
      text: 'Simons Recurring Notification',
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE}
    });
  }
  repeatingDaily(){
    this.localNotifications.schedule({
      id: 3,
      title: 'Good Morning',
      text: 'Code something epic today!',
      trigger: { every: {hour:11, minute:49}},
    });
  }
  getAll(){
    this.localNotifications.getAll().then(res=>{
      this.scheduled = res;
    })
  }
  showAlert(header, sub, msg){
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons:['OK']
    }).then(alert=>alert.present());
  }
  

}