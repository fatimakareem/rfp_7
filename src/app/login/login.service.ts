import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
// import { JwtHelperService  } from '@auth0/angular-jwt';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';
import * as moment from 'moment';
@Injectable()
export class LoginService {
    jwtHelper: JwtHelper  = new JwtHelper ();

    constructor(private _http5: HttpService) {
    }

    loaded: boolean = false;
    time;
    exp_time;
    login(username: string, password: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.post('https://apis.rfpgurus.com/user-token-auth/',
            JSON.stringify({ username: username, password: password }), { headers: headers })
            .map((response: Response) => {
                let user = { userid: this.jwtHelper.decodeToken(response.json().token).user_id, username: this.jwtHelper.decodeToken(response.json().token).username, token: response.json().token };
                if (user && user.token) {
                    this.time=new Date()
                   this.exp_time= moment(this.time).add(1,'days');
                    localStorage.setItem('loged_in', '1');
                    localStorage.setItem('exp', this.exp_time);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                // console.log("junaid",this.jwtHelper.decodeToken(response.json().token))
            });
    }
    adminlogin(username: string, password: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.post('https://apis.rfpgurus.com/user-token-auth/',
            JSON.stringify({ username: username, password: password }), { headers: headers })
            .map((response: Response) => {
                let user = { userid: this.jwtHelper.decodeToken(response.json().token).user_id, username: this.jwtHelper.decodeToken(response.json().token).username, token: response.json().token };
                if (user && user.token) {
                    localStorage.setItem('currentadmin', username);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                // console.log("junaid",this.jwtHelper.decodeToken(response.json().token))
            });
    }

    login_authenticate(username) {
        return this._http5.post('https://apis.rfpgurus.com/ac_login/', {
            'username': username
        }).map((res: Response) => res.json())
    }


    post_service(obj) {
        return this._http5.post("https://apis.rfpgurus.com/register/", {
            'obj': obj
        }).map((res: Response) => res.json());
    }
    activation_service(email) {
        console.log(email);
        return this._http5.post("https://apis.rfpgurus.com/ac_code/", {
            'email': email
        }).map((res: Response) => res.json())
    }

    authenticate_service(uid) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://apis.rfpgurus.com/activate/' + uid,
            { headers: headers }).map((response: Response) => response.json());
    }
    forget_password(email) {
        return this._http5.post('https://apis.rfpgurus.com/forget_password/', {
            'email': email
        }).map((res: Response) => res.json())
    }
    change_password(pass1, pass2, code) {
        return this._http5.post('https://apis.rfpgurus.com/change_password/', {
            'pass1': pass1,
            'pass2': pass2,
            'code': code,
        }).map((res: Response) => res.json())
    }
   
}