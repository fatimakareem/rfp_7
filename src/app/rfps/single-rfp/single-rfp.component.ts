
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/filter';
import { Http, Headers, Response } from '@angular/http';
import { RfpService } from './rfp.service';
import swal from 'sweetalert2';
import 'rxjs/Rx';
import { SharedData } from '../../shared-service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../../serv/meta_service';
import { MatDialog } from '@angular/material';
import { EditRfpComponent } from '../../edit-rfp/edit-rfp.component';
@Component({
  selector: 'app-data-table-cmp',
  templateUrl: 'single-rfp.component.html',
  styleUrls: ['./single-rfp.component.css']

})

export class SingleRfpComponent implements OnInit, OnDestroy {
  date;
  check(date) {

    this.date = moment(date, this.formats, true).isValid()
    //    
    return this.date;


  }
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  rfpid: string;
  id;
  record = [];
  statuss;
  local;
  uname;
  subscribe;
  currentUser;
  wrfp;
  constructor(public dialog: MatDialog, private _nav: Router, public _shareData: SharedData, private _http: Http, private route: ActivatedRoute, private _serv: RfpService, private _location: Location, private title: Title, private meta: Meta, private metaService: MetaService) { 


    this.meta.addTag({ name: 'Keywords', content: 'rfp bid sites,rfp bidding sites, bid sites, rfp usa, government rfp website, rfp consulting firm, rfp consulting firm in dallas, rfp project management, rfp project management services, rfp search engine, rfp project management services, rfp proposal, rfp consulting, government rfp, digital marketing rfp, rfp management, website rfp example, rfp services, rfp for audit services, agency rfp, best rfp software, data management rfp, energy efficiency rfp, rfp for property management services, energy storage rfp, rfp business, rfp contract terms, rfp government bids, government rfp search, rfp aggregator, best rfp database, rfp database, government rfp database, rfp sites, rfp online, find rfp, find rfp bid sites, find rfp bid, find rfp bids, Government Request for Proposal, rfp search, rfp process, marketing rfp database, architectural rfp database, architectural design bids, bid finder, government bids, government contracts, contract bidding websites, construction bidding websites, best construction bid sites, free rfp bid sites, public rfp database' });

    this.metaService.createCanonicalURL(); this.metaService.metacreateCanonicalURL();
    localStorage.removeItem('member');
  }
  back() {
    if (localStorage.getItem('location')) {
      let url = localStorage.getItem('location')
      let last = url.length
      let ur = url.slice(0, 13)
      let state = url.slice(0, 5)
      let category = url.slice(0, 8)
      let agency = url.slice(0, 6)

      if (ur == 'searched-data') { this._nav.navigate([ur], { queryParams: { keyword: url.slice(13, last) } }); }
      else if (state == 'state') {
        this._nav.navigate([state], { queryParams: { state: url.slice(5, last) } });
      }
      else if (category == 'category') {
        this._nav.navigate([category], { queryParams: { cat: url.slice(8, last) } });
      }
      else if (agency == 'agency') {

        this._nav.navigate([agency], { queryParams: { agency: url.slice(6, last) } });
      }else if(url=='admin-panel'){
        this._nav.navigate([url]);
      }
      else {
        this._nav.navigate([url]);
      }
    }
    else {
      this._nav.navigate(['/']);
    }
   
  }

  status: boolean = false;
  navbarClass() {
    this.status = !this.status;
  }




  download(info) {
    console.log(info);
    this._serv.downloadFile(info).subscribe(
      data => {
        if (data.status = "200") {
          swal(
            'File Downloaded Successfully!',
            '',
            'success'
          )
        }
      },
      error => {

      });
  }
  memberonly() {
    this.route.queryParams
      .subscribe(params => {
        //   console.log(params); // {order: "popular"}
        if (!this.local) {
          this._nav.navigate(['login']);
          this.rfpid = params['query'];
          localStorage.setItem('member', this.rfpid);
        }
        else if (!this.subscribe) {
          this._nav.navigate(['pricing']);
          this.rfpid = params['query'];
          localStorage.setItem('member', this.rfpid);
        }

      })
  }
  adminlogin;
  ngOnInit() {
    if (localStorage.getItem('currentadmin')) {
      this.adminlogin = localStorage.getItem('currentadmin')
    }
    this._shareData.currentMessage.subscribe(message => this.wrfp = message)
    this._shareData.currentMessagetotal.subscribe(message => this.total = message)
    this.route.queryParams
      .subscribe(params => {
        this.meta.updateTag({ name: 'twitter:title', content: params['query'] + ' | ' + "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.meta.updateTag({ property: 'og:title', content: params['query'] + ' | ' + "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.title.setTitle(params['query'] + ' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
        this.meta.updateTag({ content: 'rfp bid sites,rfp bidding sites, bid sites, rfp usa, government rfp website, rfp consulting firm, rfp consulting firm in dallas, rfp project management, rfp project management services, rfp search engine, rfp project management services, rfp proposal, rfp consulting, government rfp, digital marketing rfp, rfp management, website rfp example, rfp services, rfp for audit services, agency rfp, best rfp software, data management rfp, energy efficiency rfp, rfp for property management services, energy storage rfp, rfp business, rfp contract terms, rfp government bids, government rfp search, rfp aggregator, best rfp database, rfp database, government rfp database, rfp sites, rfp online, find rfp, find rfp bid sites, find rfp bid, find rfp bids, Government Request for Proposal, rfp search, rfp process, marketing rfp database, architectural rfp database, architectural design bids, bid finder, government bids, government contracts, contract bidding websites, construction bidding websites, best construction bid sites, free rfp bid sites, public rfp database,' + params['query'] }, "name ='Keywords'");
console.log(params)
        this.rfpid = params['query'];

        this._serv.rfprecord(this.rfpid,params.model).subscribe(
          data => {
            this.record = data;
            this.id = data[0].id


          },
          error => {
            //   console.log(error);
          });
        //   console.log(this.rfpid); // popular
      })

    this.check_login()

  }
  total;
  watchlist() {
    if (localStorage.getItem('currentUser')) {
      this._serv.postWatchlist(this.id).subscribe(

        data => {
          this.statuss = data.message;
          this.wrfp = data['result'];
          this.total = data.total
          console.log(data['result'], this.total)
          //  this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
          if (!data.message && data['result']) {
            this._shareData.watchtotal(this.total);
            this._shareData.watchInfo(this.wrfp);
          }
          if (this.statuss == "This Rfp is already in your Watch List") {
            swal({
              type: 'info',
              title: 'This RFP Is Already In Your Watchlist',
              showConfirmButton: true,
              confirmButtonColor: "#090200",
              width: '512px',

            });
          }
          else {
            swal({
              type: 'success',
              title: 'RFP succesfully added to your watch list',
              showConfirmButton: true,
              confirmButtonColor: "#090200",
              width: '512px',
            });
          }

        },
        error => {
          // console.log(error);
        });
    }
    else {
      swal({
        type: 'error',
        title: 'Please Login with RFPGurus',
        showConfirmButton: true,
        width: '512px',
        confirmButtonColor: "#090200",
      });

      this.route.queryParams
        .subscribe(params => {
          //   console.log(params); // {order: "popular"}

          this._nav.navigate(['login']);
          this.rfpid = params['query'];
          localStorage.setItem('member', this.rfpid);
        });
    }


  }
  doc;
  check_trial(url){
    if( this.subscribe=="Trial Subscription user"){
      this._serv.trial_document().subscribe(
        data => {
 
  if(data.status=='True'){
    this.doc=data.status;
    window.open(url,'_blank');
  }else{
    swal({
      type: 'error',
      title: "You can't download more documents" ,
      showConfirmButton: true,
      width: '512px',
      confirmButtonColor: "#090200",
    });
  
  }
 
        })
    }else if(this.subscribe== "Subscribe user"){
     
      window.open(url,'_blank');
     
    }
   
  }
  check_login() {
    if (localStorage.getItem('currentadmin')) {
      this.subscribe = localStorage.getItem('currentadmin')
    }
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      this._serv.usersubscribe(this.uname).subscribe(
        data => {
          //   console.log(data.Response);
          if (data.Response == "Subscribe user" ||data.Response== "Trial Subscription user") {
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
  ngOnDestroy() {
   

    this.meta.updateTag({ name: 'Keywords', content: 'rfp bid sites,rfp bidding sites, bid sites, rfp usa, government rfp website, rfp consulting firm, rfp consulting firm in dallas, rfp project management, rfp project management services, rfp search engine, rfp project management services, rfp proposal, rfp consulting, government rfp, digital marketing rfp, rfp management, website rfp example, rfp services, rfp for audit services, agency rfp, best rfp software, data management rfp, energy efficiency rfp, rfp for property management services, energy storage rfp, rfp business, rfp contract terms, rfp government bids, government rfp search, rfp aggregator, best rfp database, rfp database, government rfp database, rfp sites, rfp online, find rfp, find rfp bid sites, find rfp bid, find rfp bids, Government Request for Proposal, rfp search, rfp process, marketing rfp database, architectural rfp database, architectural design bids, bid finder, government bids, government contracts, contract bidding websites, construction bidding websites, best construction bid sites, free rfp bid sites, public rfp database' });
    // localStorage.removeItem('selected_model');
  }
  btnEditClick(id, rfpkey, rfp_number, title, descriptionTag, state, agency, date_entered, due_date, web_info, rfp_reference, category, sub_category, seoTitleUrl, bid_type, agency_type, city_or_county, city, openrfp,oldcategory) {
    if(agency){
      var agen =agency.toLowerCase( );
              }
    const dialogRef = this.dialog.open(EditRfpComponent, {
      width: '80%',
      height: '600px',
      data: {
        rfpkey: rfpkey,
        rfp_number: rfp_number,
        title: title,
        descriptionTag: descriptionTag,
        state: state,
        agency: agen,
        date_entered: date_entered,
        due_date: due_date,
        web_infoo: web_info,
        rfp_reference: rfp_reference,
        id: id,
        category: category,
        subcat: sub_category,
        seoTitleUrl: seoTitleUrl,
        bid_type: bid_type,
        agency_type: agency_type,
        city_or_county: city_or_county,
        city: city,
        open_rfp: openrfp,
        oldcategory:oldcategory,
        data_model: JSON.parse(localStorage.getItem('selected_model'))
      }
    }).afterClosed()
    .subscribe(item => {
      this.route.queryParams
      .subscribe(params => {
      this.rfpid = params['query'];

        this._serv.rfprecord(this.rfpid,params.model).subscribe(
          data => {
            this.record = data;
            this.id = data[0].id


          },
          error => {
            //   console.log(error);
          });
        //   console.log(this.rfpid); // popular
      })
    });

  }
}
