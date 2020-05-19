import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../../services/http.service';


@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  
  username: string = "";
  password: string = "";
  email: string = "";
  phone: number = null;

  constructor(
    public toastCtrl: ToastController,
    public httpSrvc: HttpService
  ) {}

  async addRegister() {
    console.log(this.username, this.email, this.password, this.phone);

    if (this.username == "") {
      const toast = await this.toastCtrl.create({
        header: "¡El Nombre es obligatorio!",
        duration: 3000,
        color: "danger",
      });
      toast.present();
    } else if (this.email == "") {
      const toast = await this.toastCtrl.create({
        header: "¡El correo es obligatorio!",
        duration: 3000,
        color: "danger",
      });
      toast.present();
    } else if (this.password == "") {
      const toast = await this.toastCtrl.create({
        header: "¡La contraseña es obligatoria!",
        duration: 3000,
        color: "danger",
      });
      toast.present();
    } else if (this.phone == null) {
      const toast = await this.toastCtrl.create({
        header: "¡El celular es obligatorio!",
        duration: 3000,
        color: "danger",
      });
      toast.present();
    } else {
    }
  }

  ngOnInit() {}
}
