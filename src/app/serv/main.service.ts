import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';

@Injectable()
export class MainService {
    currentUser;

    constructor(private _http5: HttpService ,private _http: Http ) {
        this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.currentUser)
    }
    purchaseHistory() {

        let headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://apis.rfpgurus.com/payment/history/'+JSON.parse(localStorage.getItem('currentUser')).username+'/',
            {headers: headers}).map((response: Response) => response.json());

    }


    expirePackage(expDate){
        let headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
        headers.append('Content-Type', 'application/json');
        return this._http5.post("https://apis.rfpgurus.com/payment/history/"+JSON.parse(localStorage.getItem('currentUser')).username+"/",
            JSON.stringify({
                'pkgdate': expDate,

            }),
            {headers: headers}).map((res: Response) => res.json())
    }


    packageUpdate(pkgdetail)
    {

        let headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
        headers.append('Content-Type', 'application/json');
        return this._http5.put("https://apis.rfpgurus.com/payment/history/"+JSON.parse(localStorage.getItem('currentUser')).username+"/",
            JSON.stringify({
                'pricepackage': pkgdetail.type,
                'duration': pkgdetail.dur,
                'creditno': pkgdetail.credit ,
                'exp':pkgdetail.expdate,
                'ccv':pkgdetail.ccv
            }),
            {headers: headers}).map((res: Response) => res.json())

    }

}
