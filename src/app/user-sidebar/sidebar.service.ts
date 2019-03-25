import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
// import { Router, RouterModule,NavigationEnd } from '@angular/router';
// import { AuthHttp, AuthConfig , JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { NgForm } from "@angular/forms";
import { HttpService } from './../serv/http-service';

@Injectable()
export class SidebarService {

constructor(private _http: Http ) {}

loaded:boolean =false;

rfpcategory() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('https://apis.rfpgurus.com/rf_p/category/',
    {headers: headers}).map((response: Response) => response.json());

    }
    staterfp() {
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('https://apis.rfpgurus.com/rf_p/state/',
        {headers: headers}).map((response: Response) => response.json());
        
        }



}