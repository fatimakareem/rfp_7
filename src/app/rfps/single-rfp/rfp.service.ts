import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
// import { Router, RouterModule,NavigationEnd } from '@angular/router';
// import { AuthHttp, AuthConfig , JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { NgForm } from "@angular/forms";
import { HttpService } from '../../serv/http-service';

@Injectable()
export class RfpService {
  currentUser;

  constructor(private _http: HttpService, private _http5:Http) {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
   }
   
   postWatchlist(rfpid){
    let headers = new Headers();
    if(localStorage.getItem('currentUser')){
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      }  
    headers.append('Content-Type', 'application/json');
    return this._http5.post('https://apis.rfpgurus.com/rf_p/watchlist/', JSON.stringify({
      "rfp":rfpid
    }),
    {headers: headers}).map((response: Response) => response.json());
  }
  rfprecord(id,val){
    let headers = new Headers();
    if(localStorage.getItem('currentUser')){
    headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    }  
    headers.append('Content-Type', 'application/json');
  if(val=='old'){
    return this._http.get('https://apis.rfpgurus.com/rf_p/old_rfpdata/'+id+'/',
    {headers: headers}).map((response: Response) => response.json());
  }
  else{
    return this._http.get('https://apis.rfpgurus.com/rf_p/rfpdata/'+id+'/',
    {headers: headers}).map((response: Response) => response.json());
  }
   
  }
   
  
  downloadFile(id){
    let headers = new Headers();
    if(localStorage.getItem('currentUser')){
    headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    }  
    headers.append('Content-Type', 'application/json');
  
    return this._http5.get('https://apis.rfpgurus.com/rf_p/download_file/'+id+'/',
    {headers: headers}).map((response: Response) => response.json());
  }

    usersubscribe(username)
    {
      return this._http5.post('https://apis.rfpgurus.com/pkg_sub/',{
        'username':username
    }).map((res: Response) => res.json() ) 
} 
}
