import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  login(postData: any): Observable<any> {
    return this.httpService.post('login', postData);
  }
}