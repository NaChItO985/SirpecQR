import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
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
  
  phoneC1="";
  phoneM1="";
  phoneR1:any;
  phoneN1:any;


  phoneC2="";
  phoneM2="";
  phoneR2:any;
  phoneN2:any;

  phoneC3="";
  phoneM3="";
  phoneR3:any;
  phoneN3:any;

  phoneC4="";
  phoneM4="";
  phoneR4:any;
  phoneN4:any;
  
  constructor(private barcodeScanner:BarcodeScanner,
    private toastCtrl: ToastController,
    private router: Router,
    private callSvc: CallNumber,
    public alertCtrl: AlertController,
    public http: HttpService,
    public acCtrl: ActionSheetController
    ){}

  navigate(){
    this.router.navigate(['/message'])
  }

  scanCode(){
     this.barcodeScanner.scan().then(
      async barcodeData =>{
        this.scannedCode = barcodeData.text; // Información que lee del qr
        
        if(this.scannedCode != null || undefined){
          let toast = await this.toastCtrl.create({
            header: 'Información leída correctamente',
            color:'success',
            duration: 3000,
            mode:"ios",
            position:"top"
          });
          toast.present();
        }
      }
    ), err=> console.log('Error: ', err);
  }

  async call(){
    this.documento = this.scannedCode.match(/([0-9])+/g).toString(); //Expresión regular para obtener el documento del usuario
    console.log(this.documento + " Expresión regular del QR");
    this.sendData = parseInt(this.documento); // Conversión a entero del string obtenido de la expresión regular
    console.log(this.sendData + " Entero del this.documento obtenido del QR ");
    
    if(this.sendData == 0 || null || undefined){
      let toast = await this.toastCtrl.create({
        header: 'El documento no está registrado',
        color: 'danger',
        duration: 3000,
        mode: "ios",
        position: "top"
      });
      toast.present();
    }
    else{
    let data: Observable<any> = this.http.post("api/getPhones", this.sendData);
    data.subscribe(async (res) => {        
      
      res.forEach(async phone => {
          const actionSheet = await this.acCtrl.create({
            header: '¿Qué número desea llamar?',
            buttons: [{
              text: phone.celular,
              icon: 'phone-portrait-outline',
              handler: () => {
                this.callSvc.callNumber("+57" + phone.celular, true).then(() => {
                  console.log('call worked');
                }).catch((err) => {
                  alert(JSON.stringify(err));
                })
              }
            }, {
              text: phone.celular_2,
              icon: 'phone-portrait-outline',
              handler: () => {
                this.callSvc.callNumber("+57" + phone.celular_2, true).then(() => {
                  console.log('call worked');
                }).catch((err) => {
                  alert(JSON.stringify(err));
                })
              }
            }, {
              text: phone.telefono,
              icon: 'call-outline',
              handler: () => {
                this.callSvc.callNumber("031" + phone.telefono, true).then(() => {
                  console.log('call worked');
                }).catch((err) => {
                  alert(JSON.stringify(err));
                })
              }
            }, {
              text: phone.tel_laboral,
              icon: 'business-outline',
              handler: () => {
                this.callSvc.callNumber("031" + phone.tel_laboral, true).then(() => {
                  console.log('call worked');
                }).catch((err) => {
                  alert(JSON.stringify(err));
                })
              }
            }, {
              text: 'Cancelar',
              icon: 'close',
              role: 'cancel',
              handler: () => {
              }
            }],
            mode: "ios"
          });
          actionSheet.present();
        });
      });
   }
}

  ngOnInit() {
  }
}
