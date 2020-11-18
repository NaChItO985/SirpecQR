import {Component,OnInit} from "@angular/core";
import { MessagedataService } from "../../services/messagedata.service";
import { NavController } from '@ionic/angular';
import { NativeGeocoderOptions, NativeGeocoderResult, NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

declare var window; 

@Component({
  selector: "app-tracker",
  templateUrl: "./tracker.page.html",
  styleUrls: ["./tracker.page.scss"],
})
export class TrackerPage implements OnInit {
  MessageTS: any;
  isTracking = false;
  locations:any;

  constructor(
    private MessageData: MessagedataService,
    private navCtrl: NavController,
    public nativeGeocoder: NativeGeocoder,
  ) {
    this.locations = [];
  }
  
  StartTracking(){
    window.app.backgroundGeolocation.start();
    this.GetLocations();
    this.getGeoencoder(this.locations.longitude, this.locations.latitude)
  }

  StopTracking(){
    window.app.backgroundGeolocation.stop();
  }

  GetLocations(){
    this.locations = (JSON.parse(localStorage.getItem("location"))==null)?[]:JSON.parse(localStorage.getItem("location"));
  }

   //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };
  geoAddress: string;

 //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder
      .reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.geoAddress = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert("Error getting location" + JSON.stringify(error));
        console.log(error);
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


  help() {
    this.navCtrl.navigateRoot("/slides");
  }
  ngOnInit() {
    this.MessageData.$getObjectSource
      .subscribe((data) => {
        this.MessageTS = data;
      })
      .unsubscribe();
  }
}