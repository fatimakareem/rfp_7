import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';
@Injectable()
export class BlogService {
  constructor(private _http: HttpService, private _http5: Http) {
  }
  blogRecord() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('https://apis.rfpgurus.com/bloglist',
      { headers: headers }).map((response: Response) => response.json());
  }
  singleblog(bid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('https://apis.rfpgurus.com/singleblog/' + bid,
      { headers: headers }).map((response: Response) => response.json());
  }
}
