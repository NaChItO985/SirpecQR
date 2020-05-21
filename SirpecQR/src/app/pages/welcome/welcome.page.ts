import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    public http:HttpService,
    public storage: Storage
  ) { }

  
  
  names:any;
  
  user(){
    this.storage.get('session_storage').then((res) => {
      this.http.post('api/getUpdate', res).subscribe((res) => {
        this.names = res;
      });
    });
  }


  ngOnInit() {
    this.user();
  }

}
