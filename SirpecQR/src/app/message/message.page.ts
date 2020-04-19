import { Component, ElementRef, NgZone, ViewChild, OnInit } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";

declare var google: any;


@Component({
  selector: "app-message",
  templateUrl: "./message.page.html",
  styleUrls: ["./message.page.scss"],
})
export class MessagePage implements OnInit {

  @ViewChild("Map", { static: true }) mapElement: ElementRef;
  map: any;
  mapOptions: any;
  location = { lat: null, lng: null };
  markerOptions: any = { position: null, map: null, title: null };
  marker: any;
  apiKey: any = "AIzaSyCrZxY3Gw6b0Hga0k-JGXrNZBxFYjShZX8"; /*Your API Key*/
  
  constructor(public zone: NgZone, public geolocation: Geolocation) {
    /*load google map script dynamically */
    const script = document.createElement("script");
    script.id = "googleMap";
    if (this.apiKey) {
      script.src = "https://maps.googleapis.com/maps/api/js?key=" + this.apiKey;
    } else {
      script.src = "https://maps.googleapis.com/maps/api/js?key=";
    }
    document.head.appendChild(script);
    
    /*Get Current location*/
      this.geolocation.getCurrentPosition().then((position) => {
        this.location.lat = position.coords.latitude;
        this.location.lng = position.coords.longitude;
      });

    /*Map options*/
    this.mapOptions = {
      center: this.location,
      zoom: 19,
      mapTypeControl: false,
    };
    setTimeout(() => {
      this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        this.mapOptions
      );
      /*Marker Options*/
      this.markerOptions.position = this.location;
      this.markerOptions.map = this.map;
      this.markerOptions.title = "My Location";
      this.marker = new google.maps.Marker(this.markerOptions);
    }, 3000);
  }

  /*  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }

  constructor() {
    this.getLocation();
  }

  latitude: number;
  longitude: number;
  */
  ngOnInit() {}
}
