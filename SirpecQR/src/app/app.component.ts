import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from "@ionic/storage";



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})



export class AppComponent implements OnInit {

@ViewChild('content', {static:true}) nav: NavController;  
  rootPage:any;

  public selectedIndex = 0;

  public appPages = [];

    validateLogin(){
      this.storage.get('session_storage').then((data)=>{
        if(data != null){
          this.appPages = [
            {
              title: 'Lector QR',
              url: '/qreader',
              icon: 'qr-code'
            },
            {
              title: 'Perfil y Contacto',
              url: '/contact',
              icon: 'person-circle'
            },
            {
              title: 'Mensaje',
              url: '/message',
              icon: 'mail'
            },
            {
              title: 'Enfermedades',
              url: '/folder/Trash',
              icon: 'medical'
            },
            {
              title: 'Alergias',
              url: '/folder/Spam',
              icon: 'warning'
            },
            {
              title: 'Cerrar Sesión',
              url: '/logout',
              icon: 'log-out'
            }
          ];
        }
        else if(data == null){
          this.appPages = [
            {
              title: 'Lector QR',
              url: '/qreader',
              icon: 'qr-code'
            },
            {
              title: 'Mensaje',
              url: '/message',
              icon: 'mail'
            },
            {
              title: 'Iniciar Sesión',
              url: '/login',
              icon: 'desktop'
            }
          ];
        }
      }).catch(()=>{
        console.log("Aray Deslogueado");
      });
    }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private storage: Storage,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.validateLogin();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
      
    }
  }
}
