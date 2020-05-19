import { Component, OnInit } from '@angular/core';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private smsRetriever: SmsRetriever) { }

  hash = '';

  genHash(){
    this.smsRetriever.getAppHash().then((res:any)=>{
      console.log(res);
      alert(res);
      this.hash = res;
    }).catch((error: any)=>{
      console.log(error);
    })
  }

  retrieveSMS(){
    console.log("Watching SMS");
    this.smsRetriever.startWatching().then((res:any)=>{
      console.log(res);
      const otp = res.Message.toString().substr(4,6);
      alert(`OTP Received - ${otp}`)
    }).catch((error:any) => console.error(error))
  }

  ngOnInit() {
  }

}
