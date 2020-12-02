import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { patientInterface } from '../../models/patient';

@Component({
    selector: 'app-diseases',
    templateUrl: './diseases.page.html',
    styleUrls: ['./diseases.page.scss'],
})
export class DiseasesPage implements OnInit {

    patients: patientInterface[];
    patient: any;

    constructor(
        private storage: Storage,
        private navCtrl: NavController,
        private http: HttpService,
    ) { }

    data: any
    diseasesV = false;
    id_usuario: 0;

    //Método que realiza la validación de si se aprobaron los términos y condiciones
    validate() {
        this.storage.get('termsyc').then((res) => {
            this.data = res;
            if (this.data == "x") {
                this.diseasesV = true;
            }
            else if (this.data == "o") {
                this.navCtrl.navigateRoot('/termsyc');
            }
            else {
                console.log("Hubo un problema");
            }
        });
    }

    //Método para realizar la búsqueda de datos del paciente
    search() {
        this.storage.get('session_storage').then((res) => {
            this.id_usuario = res;
            let data: Observable<any> = this.http.post("api/searchAllergies", this.id_usuario);
            data.subscribe((resp) => {
                this.patients = resp;
                if (resp != null) {
                    this.patient = resp[0].rh;
                }
                else {
                    this.patient = "";
                }
            })
        })
    }


    ngOnInit() {
        this.validate();
        this.search();
    }

}
