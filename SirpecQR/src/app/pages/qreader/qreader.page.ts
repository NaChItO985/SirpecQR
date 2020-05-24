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
        
        if(this.scannedCode){
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

    
    let data: Observable<any> = this.http.post("api/getPhones", this.sendData);
    data.subscribe(async (res) => {        

      
      console.log(JSON.stringify(res) + " Dato obtenido del response");
      
      res = JSON.stringify(res);

    

     // Match del response para obtener los celulares, pasando a string y convirtiendo a número para las llamadas 
     // Validación cuando es un número o varios digitos

      this.phoneC1 = res.match(/("celular":[0-9])\w+/g);
      if(this.phoneC1 != null || undefined){
        this.phoneM1 = this.phoneC1.toString();
        this.phoneR1 = this.phoneM1.match(/([0-9]\w)+/g);
        this.phoneN1 = parseInt(this.phoneR1);
      }
      else{
        this.phoneC1 = res.match(/("celular":[0-9])/g);
        this.phoneM1 = this.phoneC1.toString();
        this.phoneR1 = this.phoneM1.match(/([0-9])/g);
        this.phoneN1 = parseInt(this.phoneR1);
      }
      

      this.phoneC2 = res.match(/("celular_2":[0-9])\w+/g);
      if (this.phoneC2 != null || undefined) {
      this.phoneM2 = this.phoneC2.toString();
      this.phoneR2 = this.phoneM2.match(/([0-9]\w)+/g);
      this.phoneN2 = parseInt(this.phoneR2);
      }
      else{
        this.phoneC2 = res.match(/("celular_2":[0-9])/g);
        this.phoneM2 = this.phoneC2.toString();
        this.phoneR2 = this.phoneM2.match(/([0-9])/g);
        this.phoneN2 = parseInt(this.phoneR2);
      }

      this.phoneC3 = res.match(/("telefono":[0-9])\w+/g);
      if (this.phoneC3 != null || undefined){
        this.phoneM3 = this.phoneC3.toString();
        this.phoneR3 = this.phoneM3.match(/([0-9]\w)+/g);
        this.phoneN3 = parseInt(this.phoneR3);
      }
      else{
        this.phoneC3 = res.match(/("telefono":[0-9])/g);
        this.phoneM3 = this.phoneC3.toString();
        this.phoneR3 = this.phoneM3.match(/([0-9])/g);
        this.phoneN3 = parseInt(this.phoneR3);        
      }
      
      this.phoneC4 = res.match(/("tel_laboral":[0-9])\w+/g);
      if(this.phoneC4 != null || undefined){
      this.phoneM4 = this.phoneC4.toString();
      this.phoneR4 = this.phoneM4.match(/([0-9]\w)+/g);
      this.phoneN4 = parseInt(this.phoneR4);
      }
      else{
        this.phoneC4 = res.match(/("tel_laboral":[0-9])/g);
        this.phoneM4 = this.phoneC4.toString();
        this.phoneR4 = this.phoneM4.match(/([0-9])/g);
        this.phoneN4 = parseInt(this.phoneR4);    
      }

     const actionSheet = await this.acCtrl.create({
        header: '¿Qué número desea llamar?',
        buttons: [{
          text: this.phoneN1,
          icon: 'phone-portrait-outline',
          handler: () => {
            this.callSvc.callNumber("+57" + this.phoneN1, true).then(() => {
                console.log('call worked');
              }).catch((err) => {
                alert(JSON.stringify(err));
              })
          }
        }, {
          text: this.phoneN2,
          icon: 'phone-portrait-outline',
          handler: () => {
            this.callSvc.callNumber("+57" + this.phoneN2, true).then(() => {
              console.log('call worked');
            }).catch((err) => {
              alert(JSON.stringify(err));
            })
          }
          }, {
            text: this.phoneN3,
            icon: 'call-outline',
            handler: () => {
              this.callSvc.callNumber("031" + this.phoneN3, true).then(() => {
                console.log('call worked');
              }).catch((err) => {
                alert(JSON.stringify(err));
              })
            }
          }, {
            text: this.phoneN4,
            icon: 'business-outline',
            handler: () => {
              this.callSvc.callNumber("031" + this.phoneN4, true).then(() => {
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
            console.log('Cancel clicked');
          }
        }],
        mode: "ios"
      });
      actionSheet.present();
    });
}

  ngOnInit() {
  }
}
