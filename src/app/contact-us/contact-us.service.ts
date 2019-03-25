import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class ContactUsService {
  constructor(private http: Http, private _nav: Router) { }
  contact(name, email, phone, message) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    return this.http.post('https://apis.rfpgurus.com/rf_p/message',
      {
        'name': name,
        'email': email,
        'phone': phone,
        'address': message
      }).map((res: Response) => {
        console.log(res);
      })

  }

}
