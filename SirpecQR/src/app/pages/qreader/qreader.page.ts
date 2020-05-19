import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';
import { analyzeNgModules } from '@angular/compiler';
import { HttpService } from 'src/app/services/http.service';
import { Observable } from 'rxjs';



@Component({
  selector: "app-qreader",
  templateUrl: "./qreader.page.html",
  styleUrls: ["./qreader.page.scss"],
})
export class QreaderPage implements OnInit {

  sendData:any;
  scannedCode = ""; 
  documento = "";

  constructor(private barcodeScanner:BarcodeScanner,
    private toastCtrl: ToastController,
    private router: Router,
    private callSvc: CallNumber,
    public alertCtrl: AlertController,
    public http: HttpService
    ){}

  navigate(){
    this.router.navigate(['/message'])
  }

  scanCode(){
     this.barcodeScanner.scan().then(
      async barcodeData =>{
        this.scannedCode = barcodeData.text; // Información que lee del qr
        this.documento = this.scannedCode.match(/([0-9])+/g).toString(); //Expresión regular para obtener el documento del usuario
         this.sendData.parseInt(this.documento);

        let data: Observable<any> = this.http.post("api/getPhones", this.sendData);
        data.subscribe( async (res)=>{
          const alert = await this.alertCtrl.create({
            message: '¿Qué número desea llamar?',
            buttons: [
              {
                text: res.celular,
                role: 'confirm',
                cssClass: 'light',
                handler: () => {
                  this.call(res.celular);
                }
              }, {
                text: res.celular,
                role: 'confirm',
                cssClass: 'light',
                handler: () => {
                  this.call(res.celular);
                }
              }, {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'danger',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              } 
            ],
            mode:"ios"
          });

          await alert.present();

        })

        if(this.scannedCode){
          let toast = await this.toastCtrl.create({
            header: 'Información leída correctamente',
            color:'success',
            duration: 3000,
            mode:"ios"
          });
          toast.present();
        }
      }
    ), err=> console.log('Error: ', err);
  }

  call(celular){
    this.callSvc
      .callNumber("+57" + celular , true).then(()=>{
        console.log('call worked');
      }).catch((err)=>{
        alert(JSON.stringify(err));
      })
  }

  ngOnInit() {
  }
}
