import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-termsyc',
  templateUrl: './termsyc.page.html',
  styleUrls: ['./termsyc.page.scss'],
})


export class TermsycPage implements OnInit {

  constructor( private storage: Storage, private navCtrl: NavController) { }

  contract:any; 
  view: any; 
  noView:any;

  hide = '';
  slides: { img: string; title: string; desc: string }[] = [
    {
      img: "../assets/images/LogoSirpecQR.png",
      title: "Terminos y condiciones",
      desc: "La presente Política de Privacidad establece los términos en que SirpecQR usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web y su aplicación.  Esta compañía está comprometida con la seguridad de los datos de sus usuarios.",
    },
        {
      img: "../assets/images/LogoSirpecQR.png",
      title: "Terminos y condiciones",
      desc: "Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. ",
    },
     {
      img: "../assets/images/LogoSirpecQR.png",
      title: "Terminos y condiciones",
      desc: "Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.",
    },
    {
      img: "../assets/images/LogoSirpecQR.png",
      title: "Información que es recogida",
      desc: "Nuestro sitio web podrá recoger información personal por ejemplo: Nombre,  información de contacto como  su dirección de correo electrónica e información demográfica. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún servicio.",
    },
    {
      img: "../assets/images/LogoSirpecQR.png",
      title: "Uso de la información recogida",
      desc: "Nuestro sitio web administra la información con el fin de establecer comunicacion de interes a los usuarios pertenecientes al sitio, esta información debe ser suministrada para la interaccion de los mismos usuarios que requieran un servicio o prestar un servicio de reciclaje.",
    },
  ];

     Accept(){
      this.storage.set('termsyc',"x"); 
      this.navCtrl.navigateRoot('/welcome');
      };
     
     Reject(){
      this.storage.set('termsyc',"o");
       this.navCtrl.navigateRoot('/welcome');
     };   

     exitnV(){
      this.navCtrl.navigateRoot('/welcome');      
     }

     ngOnDestroy(){
      location.reload();
     }

  ngOnInit() {
      this.storage.get('termsyc').then((res)=>{
      if(res == "o"){
      this.contract = true;
      console.log("No aceptó los términos");
      }
      else if(res == "x"){
        this.noView = true;
        console.log("Aceptó los términos");
      }
      else if(res == null){
        this.contract = true;
        console.log("No ha leído los términos");
      }
    })
  }

  
}
