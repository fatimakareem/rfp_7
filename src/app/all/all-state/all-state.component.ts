import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AllStateService } from './all-state.service';
import { SharedData } from '../../shared-service';import {Location} from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../../serv/meta_service';

@Component({
  selector: 'app-all-state',
  templateUrl: './all-state.component.html',
  styleUrls: ['./all-state.component.css'],
  providers: [AllStateService, SharedData]
})
export class AllStateComponent implements OnInit, OnDestroy {
  endRequest;
  state: any = [];
  statesearch;
  back(){
    this._location.back();
  }
  loaded = false;
  public query: any;
  public Rfp: any;
  public selected: any;
  mainSearch = 0;
  constructor(public _shareData: SharedData, private _nav: Router, private _serv: AllStateService,private _location: Location,private Title: Title, private meta: Meta,private metaService: MetaService) {
   
        this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();
    this.endRequest = this._serv.rfpstate().subscribe(
      data => {
        this.state = data.Result;
        this.loaded = true;
       
      },
      error => {
       
      }
    )
  }
  singlestate(state) {
    this.endRequest = this._shareData.stateInfo(state);
    let sth = 'state';
    this._nav.navigate([sth], { queryParams: { state: state, } });
  }
  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'All States | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" }); this.meta.updateTag({ property:'og:title', content: 'All States | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'All States |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
  }
  closeSearch() {
    if (this.mainSearch == 1) {
      this.mainSearch = 0;
      this.query = '';
      this.Rfp = '';
    }
  }
  focusInput() {
    if (this.mainSearch == 1) {
      let inputField: HTMLElement = <HTMLElement>document.querySelectorAll('.search-holder input')[0];
      inputField.focus();
    }
  }
  item;
  filter(val) {
    if (val != "") {
      this._serv.searchrecord(val).subscribe(response => {
        this.state = response.results;
        this.item=response.totalItems
        
        this.loaded = true;
      });
    }else{
      this._serv.rfpstate().subscribe(
        data => {
          this.item=data.totalItems
          this.state = data.Result;
         
        },
        error => {
         
        }
      )
    }
  }
  select(item) {
    this.selected = item;
    this.mainSearch = 0;
    this.query = '';
    this.Rfp = '';
  }
  singlerfp(id, num) {
    let sth = 'single-rfp';
    this._nav.navigate([sth], { queryParams: { id: id, rfp: num } });
  }
  ngOnDestroy() {
    // this.endRequest.unsubscribe();
  }
}
