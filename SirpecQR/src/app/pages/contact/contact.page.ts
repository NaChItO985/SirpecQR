import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  documents:any;

  data(){
    this.storage.get('session_storage').then((res) => {
      this.http.post('api/getUpdate', res).subscribe((res) => {
        this.documents = res;
      })
    });
  }

  public validate = {
    ccontrasena: ""
  }

  public session = {
    "id_usuario":null,
    contrasena: "",    
  }

  public update ={
    id_usuario: null,
    celular: null,
    celular_2: null,
    telefono: null,
    tel_laboral: null,
  };

  constructor(
    public http:HttpService,
    public toastCtrl:ToastController,
    public loader: LoadingController,
    public storage: Storage
  ) { }

  async messageS(msg) {
    const toast = await this.toastCtrl.create({
      header: msg,
      duration: 2000,
      color: "success",
      mode: "ios"
    });
    toast.present();
  }
  
  async messageE(msg) {
    const toast = await this.toastCtrl.create({
      header: msg,
      duration: 2000,
      color: "danger",
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

    async updatePhones(){
      this.storage.get('session_storage').then((res) => {
        this.update.id_usuario = res;
        console.log(this.update.id_usuario + " Usuario");
      });
      if (this.update.celular == null){
        this.messageE('Celular es obligatorio.')
      }
      // Validación campo de celular, pero los otros no
      else if (this.update.celular != null && this.update.celular_2 == null && this.update.telefono == null && this.update.tel_laboral == null){
        this.loaders();

        let data: Observable<any> = this.http.post("api/userUpdate", this.update.celular);
        data.subscribe((res) => {
          console.log(res);
          if (res != null || undefined) {
            this.messageS(res);
          }
          else {
            this.messageE("Lo sentimos, error de red.");
          }
        }, () => {
          this.messageE("Error al actualizar los datos");
        }
        );
      }
      // Validación campo de celular y  celular_2 es digitado, pero los otros no
      else if (this.update.celular != null && this.update.celular_2 != null && this.update.telefono == null && this.update.tel_laboral == null) {
        this.update.telefono = 0;
        this.update.tel_laboral = 0;

        this.loaders();
        let data: Observable<any> = this.http.post("api/userUpdate", this.update);
        data.subscribe((res) => {
          console.log(res);
          if (res != null || undefined) {
            this.messageS(res);
            this.update = null;
          }
          else {
            this.messageE("Lo sentimos, error de red.");
          }
        }, () => {
          this.messageE("Error al actualizar los datos");
        }
        );
      }
      // Validación campo de celular y  telefono es digitado, pero los otros no
      else if (this.update.celular != null && this.update.celular_2 == null && this.update.telefono != null && this.update.tel_laboral == null) {
        this.update.celular_2 = 0;
        this.update.tel_laboral = 0;

        this.loaders();
        let data: Observable<any> = this.http.post("api/userUpdate", this.update);
        data.subscribe((res) => {
          console.log(res);
          if (res != null || undefined) {
            this.messageS(res);
            this.update.celular_2 = null;
            this.update.telefono = null;
            this.update.tel_laboral = null;
          }
          else {
            this.messageE("Lo sentimos, error de red.");
          }
        }, () => {
          this.messageE("Error al actualizar los datos");
        }
        );
      }
      // Validación campo de celular y  tel_laboral es digitado, pero los otros no
      else if (this.update.celular != null && this.update.celular_2 == null && this.update.telefono == null && this.update.tel_laboral != null) {
        this.update.celular_2 = 0;
        this.update.telefono = 0;

        this.loaders();
        let data: Observable<any> = this.http.post("api/userUpdate", this.update);
        data.subscribe((res) => {
          console.log(res);
          if (res != null || undefined) {
            this.messageS(res);
            this.update.celular_2 = null;
            this.update.telefono = null;
            this.update.tel_laboral = null;
          }
          else {
            this.messageE("Lo sentimos, error de red.");
          }
        }, () => {
          this.messageE("Error al actualizar los datos");
        }
        );
      }
      else if (this.update.celular == null && this.update.celular_2 == null && this.update.telefono == null && this.update.tel_laboral == null) {
        this.messageE('Por favor digite un dato a actualizar.')
      }
      else ()=>{
        console.log("Prueba");
      }
    }
  
  async updatePassword(){
    if(this.session.contrasena == ""){
      this.messageE('Digite la contraseña.');
    } else if (this.validate.ccontrasena == "")
    {
      this.messageE('Digite la confirmación de la contraseña.');
    } else if(this.session.contrasena != this.validate.ccontrasena)
    {
      this.messageE('Las contraseñas no coinciden.');
    } else if (this.session.contrasena == "" && this.validate.ccontrasena == "") 
    {
      this.messageE('Digite todos los campos.');
    } else{
      this.storage.get('session_storage').then((res) => {
        this.session.id_usuario = res;
        this.http.post('api/passUpdate', this.session).subscribe((res) => {
          this.loaders();
          this.messageS(res);
          this.session.contrasena="";
          this.validate.ccontrasena="";
        })
      });
    } 
  }

  ngOnInit() {
    this.data();
  }

}
