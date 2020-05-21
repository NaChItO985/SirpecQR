import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(public http: HttpClient) {}

  post(serviceName: string, data: any) {
    
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");

    const header = {
      headers: headers,
    };


    const url = environment.apiUrl + serviceName;
    return this.http.post(url, JSON.stringify(data), header);
  }

}

//headers: { "Content-Type": "application/json" }
//const url = environment.apiUrl + 'api/validateUser';
