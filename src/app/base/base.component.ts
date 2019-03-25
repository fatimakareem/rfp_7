import { Component, OnInit, OnDestroy } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { PagerService } from '../rfps/rfp/paginator.service';
import * as moment from 'moment';
import { AdvanceService } from '../advance-search/advance.service';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../serv/http-service';
import { Meta, Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { MetaService } from '../serv/meta_service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  providers: [PagerService, AdvanceService]
})
export class BaseComponent implements OnInit, OnDestroy {
  data;
  state;
  pager: any = {};
  date;
  check(date) {

    this.date = moment(date, this.formats, true).isValid()

    return this.date;


  }
  move() {
    localStorage.setItem('location', 'find-rfp')
    if (this.status) {
      localStorage.setItem('status', this.status)
    }
    if (this.enterdate) { localStorage.setItem('enterdate', this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.duedate) { localStorage.setItem('duedate', this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.states) { localStorage.setItem('states', this.states) }
    if (this.agencies) { localStorage.setItem('agencies', this.agencies) }
    if (this.cates) { localStorage.setItem('cates', this.cates) }
    if (this.subcates) { localStorage.setItem('subcat', this.subcates) }
    if(this.submission_from){localStorage.setItem('submission_from',this.datePipe.transform(this.submission_from, "yyyy-MM-dd h:mm:ss a "))}
    if(this.submission_to) {  localStorage.setItem('submission_to',this.datePipe.transform(this.submission_to, "yyyy-MM-dd h:mm:ss a "))}
  }
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  onUserRowSelect(event): void {
    this.data = event.data.seoTitleUrl;
    let sth = 'rfp/' + this.data;
    this._nav.navigate([sth]);

  }

  items;
  public cat = [];
  pageSize = '15';
  settings: any;
  duedate;
  enterdate;
  states;
  cates;
  title;
  Rfpnum;
  status;
  agencies;
  item;
  length;
  catsearch;
  statsearch;

  search = false;
  subcates;
  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private _adserv: AdvanceService, private pagerService: PagerService, private http: HttpService, private _nav: Router, private _location: Location, private Title: Title, private meta: Meta, private metaService: MetaService) {

    this.metaService.createCanonicalURL(); this.metaService.metacreateCanonicalURL();
  }
  submission_from;
  submission_to;
  ngOnInit() {
    window.onscroll = function() {myFunction()};

    var header = document.getElementById("MYHeader");
    var sticky = header.offsetTop;
    
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
    this.route.queryParams
      .subscribe(params => {
     
        if (localStorage.getItem('status')) {
          this.status = localStorage.getItem('status');
        } else if (localStorage.getItem('status') == null) {
          delete this.status;
        }
        if (localStorage.getItem('enterdate')) { this.enterdate = localStorage.getItem('enterdate') } else if (localStorage.getItem('enterdate') == null) {
          delete this.enterdate;
        }
        if (localStorage.getItem('duedate')) { this.duedate = localStorage.getItem('duedate') }
        else if (localStorage.getItem('duedate') == null) {
          delete this.duedate;
        }
        if (localStorage.getItem('submission_from')) { this.submission_from = localStorage.getItem('submission_from') } else if (localStorage.getItem('submission_from') == null) {
          delete this.submission_from;
        }
        if (localStorage.getItem('submission_to')) { this.submission_to = localStorage.getItem('submission_to') }
        else if (localStorage.getItem('submission_to') == null) {
          delete this.submission_to;
        }
        if (localStorage.getItem('states')) {
          this.states = localStorage.getItem('states');
        }
        else if (localStorage.getItem('states') == null) {
          delete this.states;
        }
        if (localStorage.getItem('agencies')) { this.agencies = localStorage.getItem('agencies') }
        else if (localStorage.getItem('agencies') == null) {
          delete this.agencies;
        }
        if (localStorage.getItem('cates')) { this.cates = localStorage.getItem('cates') }
        else if (localStorage.getItem('cates') == null) {
          delete this.cates;
        }
        if (localStorage.getItem('subcat')) { this.subcates = localStorage.getItem('subcat') }
        else if (localStorage.getItem('subcat') == null) {
          delete this.subcates;
        }
        if(localStorage.getItem('pages')){
          var page_num:number=Number(localStorage.getItem('pages'));
          this.onPaginateChange(page_num);
        }else{
          this.onPaginateChange(1);
        }
        // this.onPaginateChange(1);
      })

    this.meta.updateTag({ name: 'twitter:title', content: 'Find RFPs | ' + "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property: 'og:title', content: 'Find RFPs | ' + "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle('Find RFPs |' + ' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    this._adserv.rfpcategory().subscribe(
      data => {
        this.cat = data
      })
    this._adserv.rfpstate().subscribe(
      data => {
        this.state = data.Result
      })
  }
  singlerfp(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  page(pageSize) {
    if (pageSize) {
      this.pageSize = pageSize;
      if(localStorage.getItem('pages')){
        var page_num:number=Number(localStorage.getItem('pages'));
        this.onPaginateChange(page_num);
      }else{
        this.onPaginateChange(1);
      }
    }
    else {
      delete this.pageSize;
    }
  }

  changestate(states) {

    this.states = states;
    localStorage.setItem('states', this.states)
    if(localStorage.getItem('pages')){
      var page_num:number=Number(localStorage.getItem('pages'));
      this.onPaginateChange(page_num);
    }else{
      this.onPaginateChange(1);
    }
  }
  changecates(cates) {
    this.cates = cates;
    localStorage.setItem('cates', this.cates)
    if(localStorage.getItem('pages')){
      var page_num:number=Number(localStorage.getItem('pages'));
      this.onPaginateChange(page_num);
    }else{
      this.onPaginateChange(1);
    }
  }
  changeduedate(submission_from) {
    this.submission_from = moment(submission_from).format('YYYY-MM-DD');
    localStorage.setItem('submission_from',moment(submission_from).format('YYYY-MM-DD'))
    if(localStorage.getItem('pages')){
      var page_num:number=Number(localStorage.getItem('pages'));
      this.onPaginateChange(page_num);
    }else{
      this.onPaginateChange(1);
    }
  }
  changeenterdate(enterdate) {
    this.enterdate = moment(enterdate).format('YYYY-MM-DD');
    localStorage.setItem('enterdate',moment(enterdate).format('YYYY-MM-DD'))
    if(localStorage.getItem('pages')){
      var page_num:number=Number(localStorage.getItem('pages'));
      this.onPaginateChange(page_num);
    }else{
      this.onPaginateChange(1);
    }
  }
  changeagencies(agencies) {
    this.agencies = agencies;
    localStorage.setItem('agencies', this.agencies)
    if(localStorage.getItem('pages')){
      var page_num:number=Number(localStorage.getItem('pages'));
      this.onPaginateChange(page_num);
    }else{
      this.onPaginateChange(1);
    }
  }
  onPaginateChange(page) {
    localStorage.setItem('pages',page); 
    if (this.states == null) {
      delete this.states
    } if (this.cates == null) {
      delete this.cates
    }
    if (this.submission_to == null) {
      delete this.submission_to
    }
    if (this.enterdate == null) {
      delete this.enterdate
    }
    if (this.agencies == null) {
      delete this.agencies
    } if (this.status == null) {
      delete this.status
    } if (this.subcates == null) {
      delete this.subcates
    }
    // this.route.queryParams
    //   .subscribe(params => {
    if (this.Rfpnum || this.title || this.states != null || this.cates != null || this.duedate != null || this.enterdate != null || this.agencies || this.status || this.subcates || this.submission_from != null||this.submission_to != null) {
      this._adserv.searchrfprecord(this.Rfpnum, this.title, this.status, this.enterdate, this.duedate, this.states, this.agencies, this.cates, this.pageSize, page, this.subcates,this.submission_from,this.submission_to).subscribe(

        data => {
          this.items = data.Results
          this.item = data.TotalResult;
          this.pager = this.pagerService.getPager(data['TotalResult'], page, this.pageSize);
          this.search = false;
        },
        error => {
          this.search = true;
          if (error.status == "400") {
            this.length = 0;
          }
        });
    }
    //  else if (params.status || params.enterdate || params.duedate || params.state || params.agency || params.cat) {

    //   this._adserv.searchrfprecord(this.Rfpnum, this.title, params.status, params.enterdate, params.duedate, params.state, params.agency, params.cat, this.pageSize, page).subscribe(
    //     data => {
    //       this.items = data.Results;
    //       this.item = data.TotalResult;
    //       this.length = this.item;
    //       this.pager = this.pagerService.getPager(data['TotalResult'], page,this.pageSize);
    //       this.search = false;

    //     },
    //     error => {
    //       this.search = true;

    //       if (error.status == "400") {
    //         this.items.splice(0, this.items.length);
    //         this.length = 0;
    //         this.status = undefined;
    //         this.enterdate = undefined;
    //         this.duedate = undefined;
    //         this.states = undefined;
    //         this.agencies = undefined;
    //         this.cates = undefined;
    //       }
    //     });
    // }
    else {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get('https://apis.rfpgurus.com/rf_p/findrfp/' + this.pageSize + '?page=' + page, { headers: headers })
        .subscribe(Res => {
          this.items = Res.json()['results'];
          this.pager = this.pagerService.getPager(Res.json()['totalItems'], page, this.pageSize);
          this.search = false;

        });
    }
    // });

  }

  ngOnDestroy() {
    // localStorage.removeItem('status')
    // localStorage.removeItem('enterdate')
    // localStorage.removeItem('duedate')
    // localStorage.removeItem('states');

    // localStorage.removeItem('agencies')
    // localStorage.removeItem('cates')
    // localStorage.removeItem('subcat')

  }
}
