import { Component, OnInit, Input, OnDestroy, AfterContentInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdvanceService } from './advance.service';
import { MatPaginatorModule } from '@angular/material';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
// import {DatePipe} from '@angular/common';
declare var $: any;
import { HeaderService } from '../header/header.service';
import { SpeechRecognitionService } from '../header/speechservice';
import { SharedData } from '../shared-service';
import { PagerService } from '../rfps/rfp/paginator.service';
// import { DateFormat } from './date-format';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';
import { MatDialog } from '@angular/material';
import { EditRfpComponent } from '../edit-rfp/edit-rfp.component';
@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css'],
  providers: [PagerService, AdvanceService, SharedData, HeaderService, SpeechRecognitionService]
})
export class AdvanceSearchComponent implements OnInit, OnDestroy {
  public blink = false;
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  date;
  @Output() spokenText = new EventEmitter<string>();
  @Output() error = new EventEmitter<string>();
  @Input() showInput = true;
  check(date) {

    this.date = moment(date, this.formats, true).isValid()

    return this.date;


  }
  adminlogin;
  endRequest;
  pager: any = {};
  state: any = [];
  cat: any = [];
  agency: any = [];
  startIndex;
  catValue = '';
  stateValue = '';
  category;
  stateval;
  item;
  posted = '';
  enter;
  record: any = [];
  local;
  uname;
  subscribe;
  search: boolean = false;
  enterdate;
  duedate;
  states;
  agencies;
  cates;
  subcate;
  status;
  catsearch;
  agensearch;
  statsearch;
  postedDate;
  DueDate;
  subcatsearch;
  foods = [
    { value: 'active', viewValue: 'Active' },
    { value: 'expire', viewValue: 'Expired' },
    { value: 'all', viewValue: 'All' }
  ];
  datashow: boolean = false;
  filtertext;
  constructor(private datePipe: DatePipe, private speech: SpeechRecognitionService, public _shareData: SharedData, private _serv1: HeaderService, private pagerService: PagerService, private route: ActivatedRoute, private _nav: Router, private _serv: AdvanceService, private _location: Location, private Title: Title, private meta: Meta, private metaService: MetaService, public dialog: MatDialog) {

    this.metaService.createCanonicalURL(); this.metaService.metacreateCanonicalURL();
    localStorage.removeItem('member');
    if (localStorage.getItem('statuss')) {
      this.status = localStorage.getItem('statuss');
    }
    if (localStorage.getItem('enterdates')) { this.enterdate = localStorage.getItem('enterdates') }
    if (localStorage.getItem('duedates')) { this.duedate = localStorage.getItem('duedates') }
    if (localStorage.getItem('statess')) {
      this.states = localStorage.getItem('statess');
    }
    if (localStorage.getItem('agenciess')) { this.agencies = localStorage.getItem('agenciess') }
    if (localStorage.getItem('catess')) { this.cates = localStorage.getItem('catess') }
    if (localStorage.getItem('subcats')) { this.subcate = localStorage.getItem('subcats') }
    if (localStorage.getItem('submissionto')) { this.submissionto = localStorage.getItem('submissionto') }
    if (localStorage.getItem('submissionfrom')) { this.submissionfrom = localStorage.getItem('submissionfrom') }
  }
  move() {
    localStorage.setItem('location', 'advanced-search')
    if (this.status) {
      localStorage.setItem('statuss', this.status)
    }
    if (this.enterdate) { localStorage.setItem('enterdates', this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.duedate) { localStorage.setItem('duedates', this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.submissionto) { localStorage.setItem('submissionto', this.datePipe.transform(this.submissionto, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.submissionfrom) { localStorage.setItem('submissionfrom', this.datePipe.transform(this.submissionfrom, "yyyy-MM-dd h:mm:ss a ")) }
    if (this.states) { localStorage.setItem('statess', this.states) }
    if (this.agencies) { localStorage.setItem('agenciess', this.agencies) }
    if (this.cates) { localStorage.setItem('catess', this.cates) }
    if (this.subcate) { localStorage.setItem('subcats', this.subcate) }

  }
  memberonly() {

    if (!this.local) {
      this._nav.navigate(['login']);
      localStorage.setItem('member', 'advanced-search');
    }
    else if (!this.subscribe) {
      this._nav.navigate(['pricing']);
      localStorage.setItem('member', 'advanced-search');

    }
  }
  // MatPaginator Inputs
  length = 0;
  // click = 1;

  pageSize = '10';
  pageSizeOptions = [10, 20, 35, 50];
  Rfpnum;
  title;
  // MatPaginator Output
  pageEvent: PageEvent;
  download(info) {
    this.endRequest = this._serv.downloadFile(info).subscribe(
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
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  posted_date() {
    this.enter = this.posted
  }
  cat_value() {
    this.category = this.catValue
  }
  state_value() {
    this.stateval = this.stateValue
  }
  chang(status) {
    this.status = status;
    // this.onSubmit(1);
  }
  submission_from;
  submission_to;
  submissionfrom;
  submissionto;
  Submission_to(date){
    if (date) {
      this.submissionto = moment(date).format('YYYY-MM-DD');
      // this.onSubmit(1);
    }
    else {
      delete this.submissionfrom;
      delete this.submissionto;
      //  this.onSubmit(1);
    }
  }
  Submission_from(date){
    if (date) {
      this.submissionfrom = moment(date).format('YYYY-MM-DD');
      // this.onSubmit(1);
    }
    else {
      delete this.submissionfrom;
      delete this.submissionto;
      //  this.onSubmit(1);
    }
  }
  entereddate(enterdate) {
    
    if (enterdate) {
      this.postedDate = moment(enterdate).format('YYYY-MM-DD');
      // this.onSubmit(1);
    }
    else {
      delete this.enterdate;
      delete this.postedDate;
      //  this.onSubmit(1);
    }
  }
  dueddate(duedate) {
    // if (duedate == 'Invalid Date') {
    //   delete this.DueDate;
    //   delete this.duedate;
    //   this.onSubmit(1);
    // }
    if (duedate) {
      this.DueDate = moment(duedate).format('YYYY-MM-DD');
      // this.onSubmit(1);
    } else {
      delete this.DueDate;
      delete this.duedate;
      //  this.onSubmit(1);
    }

  }
  onSubmit(page) {
    localStorage.setItem('page',page); 
    this.route.queryParams
      .subscribe(params => {
        if (this.status == null) {
          delete this.status;
        }
        if (this.Rfpnum || this.title || this.status || this.postedDate || this.DueDate || this.states || this.agencies || this.cates || this.subcate || this.submissionfrom || this.submissionto) {


          this.search = false;

          this._serv.searchrfprecord(this.Rfpnum, this.title, this.status, this.postedDate, this.DueDate, this.states, this.agencies, this.cates, this.pageSize, page, this.subcate,this.submissionfrom,this.submissionto).subscribe(
            data => {
              this.record = "";
              this.item = "";
              this.record = data.Results;
              this.item = data.TotalResult;
              this.length = this.item;
              this.pager = this.pagerService.getPager(this.item, page, this.pageSize);
            },
            error => {
              this.search = true;
              this.datashow = true;
              this.record.splice(0, this.record.length);
              this.length = 0;
            });


        }

        else if (params.state) {

          this.states = params.state;
          this.search = false;

          this._serv.searchrfprecord(this.Rfpnum, this.title, this.status, this.postedDate, this.DueDate, this.states, this.agencies, this.cates, this.pageSize, page, this.subcate,this.submissionfrom,this.submissionto).subscribe(
            data => {
              this.record = "";
              this.item = "";
              this.record = data.Results;
              this.item = data.TotalResult;
              this.length = this.item;
              this.pager = this.pagerService.getPager(this.item, page, this.pageSize);
            },
            error => {
              this.search = true;
              this.datashow = true;
              this.record.splice(0, this.record.length);
              this.length = 0;
            });
        }
        else {

          this.status = "active";
          this._serv.advancesearch(this.Rfpnum, this.title, this.status, this.postedDate, this.DueDate, this.states, this.agencies, this.cates, this.pageSize, page, this.subcate).subscribe(
            data => {
              this.record = "";
              this.item = "";
              this.record = data.Results;
              this.item = data.TotalResult;
              this.length = this.item;
              this.pager = this.pagerService.getPager(this.item, page, this.pageSize);
            },
            error => {
              this.search = true;
              this.datashow = true;
              this.record.splice(0, this.record.length);
              this.length = 0;
            });
        }
      })

  }
  page(pageSize) {
    if (pageSize) {
      this.pageSize = pageSize;
      if(localStorage.getItem('page')){
        var page_num:number=Number(localStorage.getItem('page'));
        this.onSubmit(page_num);
      }else{
        this.onSubmit(1);
      }
    }
    else {
      delete this.pageSize;
    }
  }


  formclear() {
    delete this.status;
    this.enterdate = null;
    this.duedate = null;
    delete this.states;
    this.agencies = undefined;
    this.cates = undefined;
    this.search = false;

    this.postedDate = null;
    this.DueDate = null;

    localStorage.removeItem('statuss');
    localStorage.removeItem('enterdates');
    localStorage.removeItem('duedates');
    localStorage.removeItem('statess');
    localStorage.removeItem('agenciess');
    localStorage.removeItem('catess');
    localStorage.removeItem('subcats');
  }
  single(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  query;
  Rfp;
  loaded = false;
  fund(event) {
    this._shareData.catInfo(this.query);
    let requiredUrl = 'searched-data'
    this._nav.navigate([requiredUrl], { queryParams: { keyword: this.query } });
  }
  triggerMike() {
    if (!('webkitSpeechRecognition' in window)) {
    } else {
      this.blink = true;
      this.search1();
    }
  }
  /////////voice to text/////////
  search1(): void {
    this.speech.record().subscribe((text) => {
      this.query = text;
      this.blink = false;
      this.spokenText.emit(this.query);
      this.speech.stop();
    },
    );
  }
  filter(query) {
    if (this.query !== "") {
      this._serv1.searchSuggestions(this.query).subscribe(response => {
        this.Rfp = response.results;
        this.loaded = true;
      });
    }
  }
  sub_categories: any = [];
  select_state() {
    if (this.states) {
    localStorage.removeItem('agenciess');
    localStorage.removeItem('catess');
    localStorage.removeItem('subcats');
      delete this.agencies
      delete this.cates;
      delete this.subcate;
    }
    if (this.states == 'all') {

    } else {
      this._serv.dropdown(this.states, this.agencies, this.cates, this.subcate).subscribe(
        data => {
          if (data.States) {
            this.state = data.States;

          }
          if (data.Categories) {
            this.cat = data.Categories;
          }
          if (data.Agencies) {
            this.agency = data.Agencies;

          }
          if (data.Sub_categories_list) { this.sub_categories = data.Sub_categories_list; }

        })
    }


  }
  select_agency() {
    if (this.agencies) {
      delete this.cates;
      delete this.subcate;
    localStorage.removeItem('catess');
    localStorage.removeItem('subcats');
    }
    if (this.agencies == 'all') {

    }

    else {
      this._serv.dropdown(this.states, this.agencies, this.cates, this.subcate).subscribe(
        data => {
          if (data.States) {
            this.state = data.States;

          }
          if (data.Categories) {
            this.cat = data.Categories;
          }
          if (data.Agencies) {
            this.agency = data.Agencies;

          }
          if (data.Sub_categories_list) { this.sub_categories = data.Sub_categories_list; }

        })
    }


  }
  select_category() {
    this._serv.dropdown(this.states, this.agencies, this.cates, this.subcate).subscribe(
      data => {
        if (data.States) {
          this.state = data.States;

        }
        if (data.Categories) {
          this.cat = data.Categories;
        }
        if (data.Agencies) {
          this.agency = data.Agencies;

        }
        if (data.Sub_categories_list) { this.sub_categories = data.Sub_categories_list; }

      })
  }


  ngOnInit() {
    window.onscroll = function() {myFunction()};

    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;
    
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

    if (localStorage.getItem('currentadmin')) {
      this.adminlogin = localStorage.getItem('currentadmin')
    }
    this.meta.updateTag({ name: 'twitter:title', content: 'Advance Search | ' + "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property: 'og:title', content: 'Advance Search | ' + "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle('Advance Search |' + ' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

    // this.onPaginateChange(1);
    if(localStorage.getItem('page')){
      var page_num:number=Number(localStorage.getItem('page'));
      this.onSubmit(page_num);
    }else{
      this.onSubmit(1);
    }
    
    this.endRequest = this._serv.rfpstate().subscribe(
      data => {
        this.state = data.Result;
      },
      error => {
      });
    this.endRequest = this._serv.rfpcategory().subscribe(
      data => {
        this.cat = data;
      },
      error => {
      }
    )
    this.endRequest = this._serv.rfpagen().subscribe(
      data => {
        this.agency = data.Result;
      }
    )


    this.check_login();
    $("#box").click(function () {
      $("#box").toggleClass("animation-blink");
    });
   
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
          if (data.Response == "Subscribe user") {
            this.subscribe = data.Response
            return false
          }

        },
        error => {

        });
    }
    else {
      return true
    }
  }

  btnEditClick(id, rfpkey, rfp_number, title, descriptionTag, state, agency, date_entered, due_date, web_info, rfp_reference, category, sub_category, seoTitleUrl, bid_type, agency_type, city_or_county, city, openrfp, oldcategory) {
    if (agency) {
      var agen = agency.toLowerCase();
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
        oldcategory: oldcategory
        // CourseDetail: this.Courses
      }
    }).afterClosed()
      .subscribe(item => {
        if(localStorage.getItem('page')){
          var page_num:number=Number(localStorage.getItem('page'));
          this.onSubmit(page_num);
        }else{
          this.onSubmit(1);
        }
      });

  }
  ngOnDestroy() {
    // this.endRequest.unsubscribe();
  }
}