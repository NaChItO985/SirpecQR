import { Component, ElementRef, NgZone, ViewChild, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoderOptions, NativeGeocoderResult, NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { SMS } from "@ionic-native/sms/ngx";
import { MessagedataService } from '../../services/messagedata.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpService } from 'src/app/services/http.service';
import { Observable } from 'rxjs';




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
    apiKey: any = "YOURAPIKEY"; /*Your API Key*/



    constructor(
        public zone: NgZone,
        public geolocation: Geolocation,
        public nativeGeocoder: NativeGeocoder,
        public platform: Platform,
        private sms: SMS,
        private loader: LoadingController,
        private MessageData: MessagedataService,
        private toastCtrl: ToastController,
        private router: Router,
        private storage: Storage,
        public http: HttpService,
    ) {

        /*Realizar la carga del mapa de google */
        const script = document.createElement("script");
        script.id = "googleMap";
        if (this.apiKey) {
            script.src = "https://maps.googleapis.com/maps/api/js?key=" + this.apiKey;
        } else {
            script.src = "https://maps.googleapis.com/maps/api/js?key=";
        }
        document.head.appendChild(script);

        /*Obtener ubicación actual*/
        this.geolocation.getCurrentPosition().then((position) => {
            this.location.lat = position.coords.latitude;
            this.location.lng = position.coords.longitude;
        });

        /*Opciones del mapa para su visualización*/
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

    //Variables de todo el código

    geoLatitude: number;
    geoLongitude: number;
    geoAccuracy: number;
    geoAddress: string;

    watchLocationUpdates: any;
    loading: any;
    isWatching: boolean;

    messageTA = "";
    MessageTS: any;
    txtA: any;
    AlertMS: any;

    public usu = {
        id_usuario: 0
    };

    usuAMS: any;
    Dusu: any;
    sendDusu: any;
    Alat: any;
    Alon: any;
    Aadr: any;

    names: any;

    //Configuraciónd el Geoencoder
    geoencoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5,
    };

    //Método para obtener la posición actual de la persona
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
                console.log("Error obteniendo ubicación", JSON.stringify(error));
            });
    }

    //Método para obtener la dirección a partir de la latitud y longitud
    getGeoencoder(latitude, longitude) {
        this.nativeGeocoder
            .reverseGeocode(latitude, longitude, this.geoencoderOptions)
            .then((result: NativeGeocoderResult[]) => {
                this.geoAddress = this.generateAddress(result[0]);
            })
            .catch((error: any) => {
                alert("Error obteniendo ubicación" + JSON.stringify(error));
            });
    }

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

    //Método para comenzar el rastreo
    watchLocation() {
        this.isWatching = true;
        this.watchLocationUpdates = this.geolocation.watchPosition();
        this.watchLocationUpdates.subscribe((resp) => {
            this.geoLatitude = resp.coords.latitude;
            this.geoLongitude = resp.coords.longitude;
            this.getGeoencoder(this.geoLatitude, this.geoLongitude);
        });
    }

    //Método para finalizar  el rastreo
    stopLocationWatch() {
        this.isWatching = false;
        this.watchLocationUpdates.unsubscribe();
    }


    async loaders() {
        const loading = await this.loader.create({
            message: 'Espere por favor',
            duration: 1500,
            mode: "ios"
        });
        this.messageTA = "";
        await loading.present()
    }

    async messageS(msg) {
        const toast = await this.toastCtrl.create({
            header: msg,
            duration: 2000,
            color: "danger",
            mode: "ios"
        });
        toast.present();
    }

    //Método para enviar el mensaje correspondiente del text area y lo enviará a todos los usuarios registrados
    sendSMS() {
        this.sms.send("+57" + this.MessageTS.celular, this.messageTA);
        this.sms.send("+57" + this.MessageTS.celular_2, this.messageTA);
        this.loaders();
        this.router.navigate(['/qreader']);
    }

    //Método para realizar el envío del mensaje
    AlertMessage() {
        let Musu: Observable<any> = this.http.post("api/searchDocument", this.usu);
        Musu.subscribe((res) => {
            this.usuAMS = JSON.stringify(res);
            this.Dusu = this.usuAMS.match(/([0-9])+/g).toString(); //Expresión regular para obtener el documento del usuario
            this.sendDusu = parseInt(this.Dusu); // Conversión a entero del string obtenido de la expresión regular
            let data: Observable<any> = this.http.post("api/getPhones", this.sendDusu);
            data.subscribe((res) => {
                res.forEach((phone) => {
                    this.sms.send("+57" + phone.celular, "Se ha enviado una alerta de " + this.names[0].nombre + " por emergencia en la direccion: " + this.geoAddress);
                    this.sms.send("+57" + phone.celular_2, "Se ha enviado una alerta de " + this.names[0].nombre + " por emergencia en la direccion: " + this.geoAddress);
                });
            })
        });
        this.loaders();
    }


    ngOnInit() {
        this.MessageData.$getObjectSource.subscribe((data) => { this.MessageTS = data }).unsubscribe();
        this.storage.get('session_storage').then((res) => {
            this.usu.id_usuario = res;
        });
        this.storage.get('session_storage').then((res) => {
            this.http.post('api/getUpdate', res).subscribe((res) => {
                this.names = res;
            });
        });
        this.getGeolocation();
    }

}






