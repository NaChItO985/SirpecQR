import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@capacitor/core";



@Component({
  selector: "app-message",
  templateUrl: "./message.page.html",
  styleUrls: ["./message.page.scss"],
})
export class MessagePage implements OnInit {

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }

  constructor() {
    this.getLocation();
  }

  latitude: number;
  longitude: number;

  ngOnInit(){}

}
