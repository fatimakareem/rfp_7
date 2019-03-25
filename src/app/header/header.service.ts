import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';
@Injectable()
export class HeaderService {
  currentUser;
  constructor(private _http: HttpService,private _http5: Http) { this.currentUser=JSON.parse(localStorage.getItem('currentUser')); }
  logdetail(){
    let headers = new Headers();
    if(localStorage.getItem('currentUser')){
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      }  
    headers.append('Content-Type', 'application/json');
    return this._http5.get('https://apis.rfpgurus.com/rf_p/logDetail/',
    {headers: headers}).map((response: Response) => response.json());
  }
  notify(){
    let headers = new Headers();
    if(localStorage.getItem('currentUser')){
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      }  
    headers.append('Content-Type', 'application/json');
    return this._http5.get('https://apis.rfpgurus.com/user_notifications/',
    {headers: headers}).map((response: Response) => response.json());
  }
  deletenotify(id){
    let headers = new Headers();
    if(localStorage.getItem('currentUser')){
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      }  
    headers.append('Content-Type', 'application/json');
    return this._http5.delete('https://apis.rfpgurus.com/read_delete/'+id +'/',
    {headers: headers}).map((response: Response) => response.json());
  }
  Updatenotify(id){
    let headers = new Headers();
    if(localStorage.getItem('currentUser')){
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      }  
    headers.append('Content-Type', 'application/json');
    return this._http5.put('https://apis.rfpgurus.com/read_delete/'+id +'/', JSON.stringify({}),
    {headers: headers}).map((response: Response) => response.json());
  }
Watchlist(){
  let headers = new Headers();
  if(localStorage.getItem('currentUser')){
    headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    }  
  headers.append('Content-Type', 'application/json');
  return this._http5.get('https://apis.rfpgurus.com/rf_p/watchlist/',
  {headers: headers}).map((response: Response) => response.json());
}
deleteallnotify(){
  let headers = new Headers();
  if(localStorage.getItem('currentUser')){
    headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    }  
  headers.append('Content-Type', 'application/json');
  return this._http5.delete('https://apis.rfpgurus.com/delete_all_notification/',
  {headers: headers}).map((response: Response) => response.json());
}
deleteWatchlist(rfpid){
  let headers = new Headers();
  if(localStorage.getItem('currentUser')){
    headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    }  
  headers.append('Content-Type', 'application/json');
  return this._http5.delete('https://apis.rfpgurus.com/rf_p/watchlistdelete/'+rfpid,
  {headers: headers}).map((response: Response) => response.json());
}
AlldeleteWatchlist(){
  let headers = new Headers();
  if(localStorage.getItem('currentUser')){
    headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    }  
  headers.append('Content-Type', 'application/json');
  return this._http5.delete('https://apis.rfpgurus.com/rf_p/Delete_all_watch_list/', {headers: headers}).map((response: Response) => response.json());
}
  searchrecord(obj) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http5.get('https://apis.rfpgurus.com/rf_p/search_id/'+obj+'/10?page=1',
    {headers: headers}).map((response: Response) => response.json());
    }
    searchSuggestions(obj) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.post('https://apis.rfpgurus.com/rf_p/search_key/'+'15?page=1',{"query":obj},
            {headers: headers}).map((response: Response) => response.json());
    }
    record(obj){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://apis.rfpgurus.com/rf_p/search_id/'+obj+'/',
            {headers: headers}).map((response: Response) => response.json());
    }
    rfpstate() {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http5.get('https://apis.rfpgurus.com/rf_p/allstate/',
      {headers: headers}).map((response: Response) => response.json());
      }
      rfpcategory() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://apis.rfpgurus.com/rf_p/allcategory/',
        {headers: headers}).map((response: Response) => response.json());
        }  
}
