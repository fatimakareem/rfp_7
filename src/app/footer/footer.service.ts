import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Injectable()
export class FooterService {
    constructor(private http: Http, private _nav: Router) { }
    subcribe(email) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        return this.http.post('https://apis.rfpgurus.com/subscription/',
            {
                'email': email
            }).map((res: Response) => {
                console.log(res);
            })
    }
}