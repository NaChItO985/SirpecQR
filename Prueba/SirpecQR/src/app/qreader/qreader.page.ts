import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';



@Component({
  selector: "app-qreader",
  templateUrl: "./qreader.page.html",
  styleUrls: ["./qreader.page.scss"],
})
export class QreaderPage implements OnInit {

  scannedCode = null;

  constructor(private barcodeScanner:BarcodeScanner, private toastCtrl: ToastController, private router: Router, private callSvc: CallNumber){}

  navigate(){
    this.router.navigate(['/message'])
  }
  scanCode(){
    this.barcodeScanner.scan().then(
      async barcodeData =>{
        this.scannedCode = barcodeData.text;

        if(this.scannedCode){
          let toast = await this.toastCtrl.create({
            header: 'Información leída correctamente',            
            duration: 3000,
          });
          toast.present();
        }
      }
    ), err=> console.log('err: ', err);
  }

  call(){
    this.callSvc
      .callNumber("+573232750366", true).then(()=>{
        console.log('call worked');
      }).catch((err)=>{
        alert(JSON.stringify(err));
      })
  }

  ngOnInit() {}
}
