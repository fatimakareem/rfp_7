import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';

import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
@Injectable()
export class AgencyService {
    currentUser;

    constructor(private _http: HttpService,private _http5: Http) {
        this.currentUser=JSON.parse(localStorage.getItem('currentUser'));

    }

    staterecord(agency, items, page) {
        let headers = new Headers();
        if(this.currentUser){
            headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        }
        headers.append('Content-Type', 'application/json');

        return this._http.get('https://apis.rfpgurus.com/rf_p/agency/'+agency+'/'+items+'?page='+page,
            {headers: headers}).map((response: Response) => response.json());

    }

    downloadFile(id){
        let headers = new Headers();
        if(this.currentUser){
            headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        }
        headers.append('Content-Type', 'application/json');

        return this._http5.get('https://apis.rfpgurus.com/rf_p/download_file/'+id+'/',
            {headers: headers}).map((response: Response) => response.json());
    }

    unsub_staterecord(state, items, page) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('https://apis.rfpgurus.com/rf_p/unsub_std/'+state+'/'+items+'?page='+page,
            {headers: headers}).map((response: Response) => response.json());

    }
    usersubscribe(username)
    {
        return this._http5.post('https://apis.rfpgurus.com/pkg_sub/',{
            'username':username
        }).map((res: Response) => res.json() )
    }
}
