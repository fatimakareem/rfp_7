import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AllCategoryService } from './all-category.service';
import { SharedData } from '../../shared-service';import {Location} from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../../serv/meta_service';
import { AdvanceService } from '../../advance-search/advance.service';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css'],
  providers: [AllCategoryService, SharedData]
})
export class AllCategoryComponent implements OnInit, OnDestroy {
  endRequest;sub_categories:any=[];
  back(){
    this._location.back();
  }
  subcategory(value){
    this._adserv.rfpsinglesubcat(value).subscribe(
      data => {
        this.sub_categories = data.sub_categories;
      }
    )
  }
  cat: any = [];
  catsearch;
  loaded = false;
  public query: any;
  public Rfp: any;
  public selected: any;
  mainSearch = 0;
  constructor( private _adserv: AdvanceService,public _shareData: SharedData, private _nav: Router, private _serv: AllCategoryService,private _location: Location,private Title: Title, private meta: Meta,private metaService: MetaService) {
   
        this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();
   this._serv.rfpcategory_subsat().subscribe(
      data => {
        this.cat = data;
        this.loaded = true;
      },
      error => {
      }
    )
  }
  catrfp(cat) {
    this.endRequest = this._shareData.categoryInfo(cat);
    let sth = 'category';
    this._nav.navigate([sth], { queryParams: { cat: cat } });
  }
  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'All Categories | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'All Categories | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'All Categories |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

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
        this.cat = response;
        this.loaded = true;
        this.item= this.cat.length
       
      });
    }
    else{
      this._serv.rfpcategory_subsat().subscribe(
        data => {
          this.cat = data;
          this.loaded = true;
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
  }
}
