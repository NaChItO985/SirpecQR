import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

    emailok = "";


    public data = {
        email: "",
        contrasena: "",
        ccontrasena: ""
    }

    constructor(
        public http: HttpService,
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        public loader: LoadingController
    ) { }

    async messageE(msg) {
        const toast = await this.toastCtrl.create({
            header: msg,
            duration: 2000,
            color: "danger",
            mode: "ios"
        });
        toast.present();
    }
    async messageS(msg) {
        const toast = await this.toastCtrl.create({
            header: msg,
            duration: 2000,
            color: "success",
            mode: "ios"
        });
        toast.present();
    }

    async loaders() {
        const loading = await this.loader.create({
            message: 'Espere por favor',
            duration: 1000,
            mode: "ios"
        });
        await loading.present()
    }

    validateEmail() {
        let email = this.data.email.match(/(\w+\S+)@(\w+).(\w+).(\w+).(\w+)/g);
        if (email != null || undefined) {
            this.emailok = this.data.email;
        }
        else if (email == null) {
            this.data.email = "";
            this.data.contrasena = "";
            this.data.ccontrasena = "";
            this.messageE('Por favor digite un formato de correo.');
        }
    }
    resetPass() {
        this.validateEmail();
        if (this.data.email == "") {
            this.messageE('Por favor digite el correo.');
        }
        else if (this.data.contrasena == "") {
            this.messageE('Por favor digite la contraseña.');
        }
        else if (this.data.ccontrasena == "") {
            this.messageE('Por favor digite la confirmación de contraseña.')
        }
        else if (this.data.ccontrasena != this.data.contrasena) {
            this.messageE('Las contraseñas no coinciden');
        }
        else if (this.emailok != "") {
            this.http.post('api/forgotPass', this.data).subscribe((res) => {
                if (res != null) {
                    this.loaders();
                    this.messageS(res);
                    this.navCtrl.navigateRoot('/login');
                }
                else () => {
                    this.messageE('El correo no se encuentra registrado o está incorrecto');
                }
            });
        }
    }

    cancelPass() {
        this.data.email = "";
        this.data.contrasena = "";
        this.data.ccontrasena = "";
        this.navCtrl.navigateRoot('/login');
    }
    ngOnInit() {
    }

}
