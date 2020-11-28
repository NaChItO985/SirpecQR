import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.page.html',
  styleUrls: ['./diseases.page.scss'],
})
export class DiseasesPage implements OnInit {

  constructor(
    private storage: Storage,
    private navCtrl: NavController
  ) { }

    data: any
    diseasesV = true;

    validate(){
        this.storage.get('termsyc').then((res)=>{
        this.data = res;
        if(this.data == "x"){ 
          this.diseasesV = true;
        }
        else if(this.data == "o"){
          this.navCtrl.navigateRoot('/termsyc');
        }
        else{
          console.log("Hubo un problema");
        }
      });
    }

    ngOnInit() {
      this.validate();
  }

}
