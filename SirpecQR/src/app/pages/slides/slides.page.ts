import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-slides",
  templateUrl: "./slides.page.html",
  styleUrls: ["./slides.page.scss"],
})
export class SlidesPage implements OnInit {
  hide = '';
  slides: { img: string; title: string; desc: string }[] = [
    {
      img: "../assets/images/Slide-1.svg",
      title: "Comparte foto",
      desc: "Mira y comparte increíbles fotos del mundo",
    },
    {
      img: "../assets/images/parking.gif",
      title: "Escucha música",
      desc: "Toda tu música favorita está aquí",
    },
    {
      img: "../assets/images/",
      title: "Nunca te olvides de nada",
      desc: "El mejor calendario a tu disposición",
    },
    {
      img: "../assets/images/",
      title: "Tu ubicación",
      desc: "Siempre sabemos donde estás!",
    },
  ];

  constructor(private navCtrl: NavController) {}

  onClick() {
    this.hide = 'fadeOut'
    this.navCtrl.navigateRoot('/tracker');
  }

  ngOnInit() {}
}
