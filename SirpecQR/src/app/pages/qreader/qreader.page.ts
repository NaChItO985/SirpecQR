import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { Observable } from 'rxjs';
import { MessagedataService } from '../../services/messagedata.service';


@Component({
    selector: "app-qreader",
    templateUrl: "./qreader.page.html",
    styleUrls: ["./qreader.page.scss"],
})
export class QreaderPage implements OnInit {

    sendData: any;
    searchDocument: any;
    dCall: any;


    public docu = {
        id_usuario: 0
    };

    docs: any;

    scannedCode = "";
    documento = "";
    blank = "";


    accepttyc: any;
    rechazedtyc: any;

    constructor(private barcodeScanner: BarcodeScanner,
        private toastCtrl: ToastController,
        private router: Router,
        private callSvc: CallNumber,
        public alertCtrl: AlertController,
        public http: HttpService,
        public acCtrl: ActionSheetController,
        private MessageData: MessagedataService
    ) { }


    scanCode() {
        this.barcodeScanner.scan().then(
            async barcodeData => {
                this.scannedCode = barcodeData.text; // Información que lee del qr
                console.log(this.scannedCode, 'console scannedCode');
                if (this.scannedCode != null || undefined) {
                    let toast = await this.toastCtrl.create({
                        header: 'Información leída correctamente',
                        color: 'success',
                        duration: 3000,
                        mode: "ios",
                        position: "top"
                    });


                    this.documento = this.scannedCode.match(/([0-9])+/g).toString(); //Expresión regular para obtener el documento del usuario
                    this.searchDocument = parseInt(this.documento); // Conversión a entero del string obtenido de la expresión regular
                    this.docu.id_usuario = this.searchDocument;
                    console.log(this.docu.id_usuario, ' this.docu.id_usuario');

                    let doc: Observable<any> = this.http.post("api/searchDocument", this.docu);
                    console.log(doc, ' doc antes del subscribe');
                    doc.subscribe((res) => {
                        this.docs = JSON.stringify(res);
                        console.log(this.docs, ' this.docs[0].ID');
                    });
                    let doc2: Observable<any> = this.http.post("api/searchTYC", this.searchDocument);
                    console.log(doc2, ' doc2 antes del subscribe');
                    doc2.subscribe((res) => {
                        res.forEach((tyc) => {
                            console.log(tyc.tyc, ' , Console.log tyc.tyc despues del foreach');
                            if (tyc.tyc == "x") {
                                console.log('this.accepttyc true');
                                this.accepttyc = true;
                            }
                            else if (tyc.tyc == "o" || "") {
                                console.log('this.rechazedtyc true');
                                this.rechazedtyc = true;
                            }
                            else {
                                console.log(tyc, ' Error en res');
                            }
                        })
                    })
                    toast.present();
                }
            }
        ).catch(error => {
            console.log(error.status);
        });
    }

    async call() {
        this.dCall = this.docs.match(/([0-9])+/g).toString(); //Expresión regular para obtener el documento del usuario
        this.sendData = parseInt(this.dCall); // Conversión a entero del string obtenido de la expresión regular

        console.log(this.dCall, ' this.dCall');
        console.log(this.sendData, 'console de this.sendData ')

        if (this.sendData == 0 || null || undefined) {
            let toast = await this.toastCtrl.create({
                header: 'El documento no está registrado',
                color: 'danger',
                duration: 3000,
                mode: "ios",
                position: "top"
            });
            toast.present();
        }
        else {
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

    async MessageDT() {
        this.dCall = this.docs.match(/([0-9])+/g).toString(); //Expresión regular para obtener el documento del usuario
        this.sendData = parseInt(this.dCall); // Conversión a entero del string obtenido de la expresión regular

        let data: Observable<any> = this.http.post("api/getPhones", this.sendData);
        data.subscribe(async (res) => {
            res.forEach(async phone => {
                this.MessageData.sendObjectSource(phone);
                this.router.navigate(['/message']);
            });
        });
    }

    ViewDiseases() {
        this.router.navigate(['/diseases']);
    }


    ngOnInit() {
    }
}
