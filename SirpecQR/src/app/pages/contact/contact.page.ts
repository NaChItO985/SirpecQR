import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  documents:any;
  phones:any;

  public update ={
    id_usuario: null,
    celular: null,
    celular_2: null,
    telefono: null,
    tel_laboral: null,
  };


  data(){
    // Carga el campo de documento.
    this.storage.get('session_storage').then((res) => {
      this.update.id_usuario = res;
      this.http.post('api/getUpdate',this.update.id_usuario).subscribe((res) => {
        this.documents = res;        
      })
    });
    // Carga los campos del formulario con sus respectivos teléfonos
    this.storage.get('session_storage').then((res)=>{
      this.http.post('api/getUpdate', res).subscribe((res)=>{
        this.http.post('api/getPhones', res[0].id_documento).subscribe((res)=>{
          this.phones = res;
        })
      })
    })
  }

  public validate = {
    ccontrasena: ""
  }

  public session = {
    "id_usuario":null,
    contrasena: "",    
  }

  constructor(
    public http:HttpService,
    public toastCtrl:ToastController,
    public loader: LoadingController,
    public storage: Storage,
    public navCtrl: NavController
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
      duration: 500,
      mode: "ios"
    });
    await loading.present()
  }

    async updatePhones(){

      if (this.update.celular == null){
        this.messageE('Celular es obligatorio.')
      }
      else{
        this.loaders();
          // Genera un for que lee las validaciones de campos consultandolos en la base de datos
              for (let p of this.phones) {
                if(this.update.celular_2 != null || undefined){
                  this.update.celular_2;
                }
                else if (this.update.celular_2 == null || undefined) {
                  this.update.celular_2 = p.celular_2;                  
                }
                else{
                  this.update.celular_2 = 0;
                }
                if (this.update.telefono != null || undefined) {
                  this.update.telefono;                 
                }
                else if (this.update.telefono == null || undefined) {
                  this.update.telefono = p.telefono;
                }
                else {
                  this.update.telefono = 0;                  
                }
                if (this.update.tel_laboral != null || undefined) {
                  this.update.tel_laboral;
                }
                else if (this.update.tel_laboral == null || undefined) {
                  this.update.tel_laboral = p.tel_laboral;
                }
                else {
                  this.update.tel_laboral = 0;
                }
              }

          if (this.update == null || undefined) {
            this.messageE("Error al actualizar los datos")
          }
          else {
            let data: Observable<any> = this.http.post("api/userUpdate", this.update);
            data.subscribe((res) => {
              if (res != null || undefined) {
                this.navCtrl.navigateRoot('/qreader');
                this.messageS("Los datos se actualizaron correctamente");
              }
              else {
                this.messageE("Lo sentimos, error de red.");
              }
            }, () => {
              this.messageE("Error al actualizar los datos");
            }
            );
          }
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
