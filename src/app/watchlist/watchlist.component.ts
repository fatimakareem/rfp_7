import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { SharedData } from '../shared-service';
import { Router } from '@angular/router';
import { RfpService } from '../rfps/single-rfp/rfp.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {Location} from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  date;
  back(){
    this._location.back();
  }
    check(date){
         
      this.date= moment(date, this.formats, true).isValid()
     
      return this.date;
     
   
  }
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  wrfp;
  message;
  total;
  constructor(private _nav: Router, private _serv: HeaderService, public _shareData: SharedData, private _serv1: RfpService,private _location: Location,private Title: Title, private meta: Meta,private metaService: MetaService) { 
  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();}

  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content: 'Watchlist | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" }); this.meta.updateTag({ property:'og:title', content: 'Watchlist | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Watchlist |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    this._shareData.currentMessage.subscribe(message => this.wrfp = message)
    this.watchlist();
    this.check_login();
  }
  move() {
    localStorage.setItem('location', 'my-watchlist')
  }
  watchlist() {
    this._serv.Watchlist().subscribe(

      data => {
        this.wrfp = data['result'];
        this.message = data.message;
        this.total = data.total
        if (!data.message && data['result']) {

          this._shareData.watchtotal(this.total);
          this._shareData.watchInfo(this.wrfp);
        }
        if (data.message == 'No Rfp in your Watch List') {
          this._shareData.watchtotal(this.total);
          this._shareData.watchInfo(this.wrfp);
        }
        console.log(this.wrfp);
      },
      error => {
        // console.log(error);
      });
  }

  id;
  title;
  get(id, title) {
    this.id = id;
    this.title = title
  }
  deletewatchlist() {
    swal({
      title: 'Are you sure you want to delete from watchlist? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // alert(result)
      if (result==true) {
    this._serv.deleteWatchlist(this.id).subscribe(

      data => {
        this.watchlist();

      },
      error => {
        // console.log(error);
      });
    }})
  }
  All_deletewatchlist() {
    swal({
      title: 'Are you sure you want to delete watchlist? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // alert(result)
      if (result==true) {
    this._serv.AlldeleteWatchlist().subscribe(
      data => {
        swal({
          type: 'success',
          title: 'Your Watch List Successfully Clear',
          showConfirmButton: false,
          timer: 2500,width: '512px',

        });
        this.watchlist();
      },
      error => {
        // console.log(error);
      });}})
  }
  singlerfp(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  local;
  uname;
  subscribe;
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      this._serv1.usersubscribe(this.uname).subscribe(
        data => {
          //   console.log(data.Response);
          if (data.Response == "Subscribe user") {
            this.subscribe = data.Response
            return false
          }
        },
        error => {
          // console.log(error);
        });

    }
    else {
      return true
    }
  }

}
