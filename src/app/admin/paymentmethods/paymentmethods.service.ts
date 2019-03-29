import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';import {Observable} from 'rxjs/Rx';
import swal from 'sweetalert2';

@Injectable()
export class PaymentmethodsService {
  currentUser;
  constructor(private http: HttpService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  addCard(status, name, address, zip, city, state, country, cardno, ccv, expiryDate,var_type_atm,setautopay,nickname) {
    let header = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    header.append('Content-Type', 'application/json');
    return this.http.post('https://apis.rfpgurus.com/payment/cardinfo/',
      JSON.stringify({
        "default": status,
        "name": name,
        // "pinCode": pin,
        "street_address": address,
        "zipcode": zip,
        "city": city,
        "state": state,
        "country": country,
        "number": cardno,
        "cvc": ccv,
        "expDate": expiryDate,
        "card_type":var_type_atm,
        "autopay":setautopay,
        "nickname":nickname
      }),
      { headers: header }).map((res: Response) => {
        if (res) {
       
          if (res.status === 201 || res.status === 200) {
            const responce_data = res.json();
           
            return responce_data;
          } 
        }
      }).catch((error: any) => {
        // alert(error.status);
        if (error.status === 302) {
          // if (error.status == 302) {
            swal({
              type: 'error',
              title: 'This Card Already Exist!',
              showConfirmButton: false,
              timer: 1500,width: '512px',
            })
          // }
          return Observable.throw(new Error(error.status));
        } else if (error.status === 405) {
          
                swal({
                  type: 'error',
                  title: 'Invalid Card! Please Enter Correct Details!',
                  showConfirmButton: false,
                  timer: 1500,width: '512px',
                })
           
          return Observable.throw(new Error(error.status));
        } else {
          swal(
                  'Sorry',
                  'You cannot enter card more than 8 cards!',
                  'error'
                )
  
          return Observable.throw(new Error(error.status));
        }
      });
  }
  showCards() {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://apis.rfpgurus.com/payment/cardinfo/', { headers: headers }).map((response: Response) => response.json());
  }
  updateCard(status,autopay,id, name, updatecardnumber, updateccv, date, updateaddress, updatezip, updatecity, updatestate, updatecountry) {
    let header = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    header.append('Content-Type', 'application/json');
    return this.http.put('https://apis.rfpgurus.com/payment/cardinfo/',
      JSON.stringify({
        // "cardNumber": cardno,
        "default": status,
        "cid": id,
        "name": name,
        // "pinCode": pin,
        // "street_address": address,
        // "zipcode": zip,
        // "city": city,
        // "state": state,
        // "country": country,
        // "number": cardno,
        // "cvc": ccv,
        "expDate": date,
        "autopay":autopay
      }),
      { headers: header }).map((response: Response) => response.json());
  }
  deleteCard(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete('https://apis.rfpgurus.com/payment/cardinfodelete/' + id, { headers: headers }).map((response: Response) => response.json());
  }
  Atm_card_exist(card) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    // alert(JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://apis.rfpgurus.com/payment/cardnoexist/',
      JSON.stringify({
        'number': card
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}