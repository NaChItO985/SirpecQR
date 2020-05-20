import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { AppComponent } from '../../app.component';


@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {

  //public regExp = new RegExp('/\d/', 'g'); 
  

  public postData = {
    id_documento: null,
    contrasena: "",
  };


  constructor(private toastCtrl: ToastController,
    private http: HttpService,
    private navCtrl: NavController,
    private loader: LoadingController,
    private storage: Storage,
    private appComp: AppComponent
    ) {}

  ngOnInit() {
  }

  async  ionViewWillLeave() {
    const loading = await this.loader.create({
      message: 'Por favor espere...',
      duration: 1000
    });
    location.reload();
    await loading.present();
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
      duration: 2000,
      mode:"ios"
    });
    await loading.present()
  }

   async loginAction() {
    if(this.postData.id_documento == null){
      this.messageE("El documento es obligatorio");
    }
    else if(this.postData.contrasena == ""){
      this.messageE("La contraseña es obligatoria")
    }
    else if(this.postData.id_documento == null && this.postData.contrasena == ""){
      this.loaders();
    }
    else {
      let data: Observable<any> = this.http.post("api/validateUser", this.postData);
      data.subscribe((res) => {
        if(res.IDUsuario != null){
          this.storage.set('session_storage', res.IDUsuario);
          this.navCtrl.navigateRoot('/welcome');
          this.appComp.validateLogin();
        }
        else{
          this.messageE("Lo sentimos, error de red.");
        }
      },()=>{
       this.messageE("Usuario o contraseña incorrectos");
      }
      );
    } 
  }
}
