import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
@Injectable()
export class ChangedPasswordService {
    currentUser;

    constructor(private _http5: HttpService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    loaded: boolean = false;
    user_change_password(oldpass, pass1, pass2) {
        let headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
        headers.append('Content-Type', 'application/json');
        return this._http5.put('https://apis.rfpgurus.com/user_change_password/' + this.currentUser.username + '/',
            JSON.stringify({
                "currentPassword": oldpass,
                "newPassword": pass1,
                "newPassword2": pass2,
            }),
            { headers: headers }).map((data: Response) => data.json());
    }
}