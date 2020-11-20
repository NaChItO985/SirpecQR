import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController

    ) { }

  async logout(){
    this.storage.remove('session_storage');
      const toast = await this.toastCtrl.create({
        header: 'Se ha cerrado la sesión correctamente',
        position: 'bottom',
        duration: 3000,
        color: 'success'
      });
    this.navCtrl.navigateRoot('/login');  
    toast.present();
  }

  NonlogOut(){
    this.navCtrl.navigateRoot('/qreader');
  }

async  ionViewWillLeave() {
  const loading = await this.loadingCtrl.create({
    message: 'Por favor espere...',
    duration: 3000
  });
  location.reload();
  await loading.present(); 
  }

  
  ngOnInit() {
  }

}
