import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from './sidebar.service';
import {SharedData } from './../shared-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { AdvanceService } from '../advance-search/advance.service';
import { FormControl, NgForm, Validators } from '@angular/forms'
import {DatePipe} from '@angular/common';
import { AllCategoryService } from '../all/all-category/all-category.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
  providers: [AllCategoryService]
})
export class UserSidebarComponent implements OnInit,OnDestroy {
  cat: any = [];
  state: any = [];
  agency: any=[];
  subcates;
  subcatsearch;
  
    statsearch;
    catsearch;
    agensearch;

  enterdate;
  duedate;
  agencies;
  states;
  cates;
  loaded;
  cat_subcat:any=[];
  status;sub_categories:any[];
  foods = [
  { value: 'active', viewValue: 'Active' },
  { value: 'expire', viewValue: 'Expire' },
  { value: 'all', viewValue: 'All' }
  ];
  local;
  uname;
  endRequest;
    constructor(private datePipe: DatePipe,public _shareData: SharedData,private _nav: Router, private _serv: SidebarService, private _adserv: AdvanceService,private _serv1:AllCategoryService) {
      if (localStorage.getItem('status')) {
        this.status = localStorage.getItem('status');
      }
      if (localStorage.getItem('enterdate')) { this.enterdate = localStorage.getItem('enterdate') }
      if (localStorage.getItem('duedate')) { this.duedate = localStorage.getItem('duedate') }
      if (localStorage.getItem('submission_from')) { this.submission_from = localStorage.getItem('submission_from') }
      if (localStorage.getItem('submission_to')) { this.submission_to = localStorage.getItem('submission_to') }
      if (localStorage.getItem('states')) {
      this.states = localStorage.getItem('states');
      }
      if (localStorage.getItem('agencies')) { this.agencies = localStorage.getItem('agencies') }
      if (localStorage.getItem('cates')) { this.cates = localStorage.getItem('cates') }
      if (localStorage.getItem('subcat')) { this.subcates = localStorage.getItem('subcat') }
      this._serv1.rfpcategory_subsat().subscribe(
        data => {
          this.cat_subcat = data;
          console.log(this.cat)
          this.loaded = true;
        },
        error => {
        }
      )
    }
    select_state() {
      if (this.states) {
      localStorage.removeItem('agencies');
      localStorage.removeItem('cates');
      localStorage.removeItem('subcat');
        delete this.agencies
        delete this.cates;
        delete this.subcates;
      }
      if (this.states == 'all') {
        
      } else {
        this._adserv.dropdown(this.states, this.agencies, this.cates, this.subcates).subscribe(
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
      this.onSubmit();
  
    }
    select_agency() {
      if (this.agencies) {
        delete this.cates;
        delete this.subcates;
      localStorage.removeItem('cates');
      localStorage.removeItem('subcat');
      }
      if (this.agencies == 'all') {
  
      }
  
      else {
        this._adserv.dropdown(this.states, this.agencies, this.cates, this.subcates).subscribe(
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
      this.onSubmit();
  
    }
    select_category() {
      this._adserv.dropdown(this.states, this.agencies, this.cates, this.subcates).subscribe(
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
        this.onSubmit();
    }
    submission_from;
    submission_to;
   
    formclear() {
    delete this.status;
    delete this.enterdate;
      delete this.duedate;
      delete this.states;
      delete this.agencies;
      delete this.cates;
      delete this.enterdate;
      delete this.duedate;
      delete this.subcates;
      delete this.submission_from;
        delete this.submission_to;
    }
    onSubmit() {
     
    
        // if (F.valid == true) {
          if(this.status){
            localStorage.setItem('status',this.status)
          }
          if(this.enterdate){localStorage.setItem('enterdate',this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a "))}
           if(this.duedate) {  localStorage.setItem('duedate',this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a "))}
           if(this.submission_from){localStorage.setItem('submission_from',this.datePipe.transform(this.submission_from, "yyyy-MM-dd h:mm:ss a "))}
           if(this.submission_to) {  localStorage.setItem('submission_to',this.datePipe.transform(this.submission_to, "yyyy-MM-dd h:mm:ss a "))}
          if(this.states){ localStorage.setItem('states',this.states)}
          if(this.agencies){localStorage.setItem('agencies',this.agencies)}
          if(this.cates){localStorage.setItem('cates',this.cates)}
          if(this.subcates){localStorage.setItem('subcat',this.subcates)}
            let searchUrl = 'find-rfp';
          
            this._nav.navigate([searchUrl],
            
               {
                queryParams: {
                    status: this.status,
                    enterdate: this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a "),
                    duedate: this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a "),
                    state: this.states,
                    agency: this.agencies,
                    cat: this.cates,
                    subcat:this.subcates,
                    submission_to:this.datePipe.transform(this.submission_to, "yyyy-MM-dd h:mm:ss a "),
                    submission_from:this.datePipe.transform(this.submission_from, "yyyy-MM-dd h:mm:ss a ")
                }
            });
        // }
    }
    
  catRfp(item) {
  
    this._shareData.categoryInfo(item);
    this.formclear();         
    let sth = 'category';
    // sth=sth.replace(/&/g,'and').replace(/\s+/g, '-').toLowerCase();
    this._nav.navigate([sth], { queryParams: { cat: item } });
  }
  
  rfpState(state) {
    console.log("sssssssssssssss", state);
    this._shareData.stateInfo(state); 
    this.formclear();         
            
    let sth = 'state';
    // sth=sth.replace(/&/g,'and').replace(/\s+/g, '-').toLowerCase();
    this._nav.navigate([sth], { queryParams: { state: state, } });
  }
  subcategory(value){
    this._adserv.rfpsinglesubcat(value).subscribe(
      data => {
        this.sub_categories = data.sub_categories;
        console.log(this.sub_categories);
      }
    )
  }
  ngOnInit() {
    if(localStorage.getItem('status')){this.status=localStorage.getItem('status')}
    if(localStorage.getItem('enterdate')){this.enterdate=localStorage.getItem('enterdate')}
     if(localStorage.getItem('duedate')){this.duedate=localStorage.getItem('duedate')}
     if(localStorage.getItem('states')){  this.states= localStorage.getItem('states');
    }
    if(localStorage.getItem('submission_from')){this.submission_from=localStorage.getItem('submission_from')}
    if(localStorage.getItem('submission_to')){this.submission_to=localStorage.getItem('submission_to')}
   if( localStorage.getItem('agencies')){this.agencies= localStorage.getItem('agencies')}
    if(localStorage.getItem('cates')){ this.cates=localStorage.getItem('cates')}
    if(localStorage.getItem('subcat')){ this.subcates=localStorage.getItem('subcat')}
this.endRequest= this._adserv.rfpstate().subscribe(
  data => {
  this.state = data.Result;
  console.log(this.state);
  },
  error => {
  // console.log(error);
  });
  this.endRequest=this._adserv.rfpcategory().subscribe(
  data => {
  this.cat = data;
  // console.log(data);
  },
  error => {
  // console.log(error);
  }
  )
      this.endRequest=this._adserv.rfpagen().subscribe(
          data=>{
              this.agency=data.Result;
              console.log(this.agency);
          }
      )


  }
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username

      return true
    }
    else {
      return false
    }

  }
  ngOnDestroy(){
    this.endRequest.unsubscribe();
localStorage.removeItem('status')
 localStorage.removeItem('enterdate')
localStorage.removeItem('duedate')
localStorage.removeItem('submission_from')
localStorage.removeItem('submission_to')
 localStorage.removeItem('states');
 localStorage.removeItem('subcat')

localStorage.removeItem('agencies')
localStorage.removeItem('cates')
delete this.status;
delete this.enterdate;
delete this.duedate;
delete this.submission_from;
delete this.submission_to;
delete this.states;
delete this.agencies;
delete this.cates;
delete this.subcates;

  }
}
