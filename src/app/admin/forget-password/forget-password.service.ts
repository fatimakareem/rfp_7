import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
@Injectable()
export class ForgetPasswordService {
    constructor(private _http5: HttpService) { }
    loaded: boolean = false;
    change_password(pass1, pass2, code) {
        const headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this._http5.put('https://apis.rfpgurus.com/change_password/', JSON.stringify(
            {
                "pass1": pass1,
                "pass2": pass2,
                "code": code
            }), { headers: headers }).map((res: Response) => res.json())
    }
}