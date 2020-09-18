import { Component, ElementRef, NgZone, ViewChild, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoderOptions, NativeGeocoderResult, NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ToastController, Platform, LoadingController } from '@ionic/angular';
import { SMS } from "@ionic-native/sms/ngx";
import { MessagedataService } from '../../services/messagedata.service';



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

  constructor(
    public zone: NgZone,
    public geolocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,
    private toastCtrl: ToastController,
    public platform: Platform,
    private sms: SMS,
    private loader: LoadingController,
    private MessageData: MessagedataService
  ) {
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
      this.markerOptions.title = "Sitio del accidente";
      this.marker = new google.maps.Marker(this.markerOptions);
    }, 3000);
  }

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;

  watchLocationUpdates: any;
  loading: any;
  isWatching: boolean;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  //Get current coordinates of device
  getGeolocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.geoLatitude = resp.coords.latitude;
        this.geoLongitude = resp.coords.longitude;
        this.geoAccuracy = resp.coords.accuracy;
        this.getGeoencoder(this.geoLatitude, this.geoLongitude);
      })
      .catch((error) => {
        alert("Error getting geolocation" + JSON.stringify(error));
      });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder
      .reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.geoAddress = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert("Error getting location" + JSON.stringify(error));
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length) address += obj[val] + ", ";
    }
    return address.slice(0, -2);
  }

  //Start location update watch
  watchLocation() {
    this.isWatching = true;
    this.watchLocationUpdates = this.geolocation.watchPosition();
    this.watchLocationUpdates.subscribe((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.getGeoencoder(this.geoLatitude, this.geoLongitude);
    });
  }

  //Stop location update watch
  stopLocationWatch() {
    this.isWatching = false;
    this.watchLocationUpdates.unsubscribe();
  }

  messageTA = "";
  MessageTS: any;


  async loaders() {
    const loading = await this.loader.create({
      message: 'Espere por favor',
      duration: 1000,
      mode: "ios"
    });
    this.messageTA = "";
    await loading.present()
  }

  sendSMS() {
    this.sms.send(this.MessageTS.celular, this.messageTA);
    this.sms.send(this.MessageTS.celular_2, this.messageTA);
    this.loaders();
  }

  
  ngOnInit() {
    this.MessageData.$getObjectSource.subscribe((data) =>{this.MessageTS = data}).unsubscribe();
  } 

}
