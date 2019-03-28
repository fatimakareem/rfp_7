import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SharedData } from '../../shared-service';
import { PagerService } from '../../rfps/rfp/paginator.service';
import { AllRfpsService } from './all-rfps.service';
declare const $: any;
import {  Compiler } from '@angular/core';
import * as moment from 'moment';
import {Location} from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../../serv/meta_service';
import { MatDialog } from '@angular/material';
import { EditRfpComponent } from '../../edit-rfp/edit-rfp.component';
@Component({
    selector: 'app-all-rfps',
    templateUrl: './all-rfps.component.html',
    styleUrls: ['./all-rfps.component.css'],
    providers: [PagerService, AllRfpsService, SharedData]
})
export class AllRfpsComponent implements OnInit {
    item;
    back(){
        this._location.back();
      }
    state;
    record: any = [];
    currentUser;
    length = 0;
    constructor( public dialog: MatDialog,private _compiler: Compiler,private pagerService: PagerService, public _shareData: SharedData, private _nav: Router, private _serv: AllRfpsService, private route: ActivatedRoute,private _location: Location,private Title: Title, private meta: Meta,private metaService: MetaService) {
       
        this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();
        localStorage.removeItem('member'); }
   formats = [
        moment.ISO_8601,
        "YYYY/MM/DD"
    ];
    // MatPaginator Inputs
    // length
    pageSize = "10";
    matpageSizeOptions = [10, 20, 35, 50];
    pager: any = {};
    end;
    status;
    local;
    uname;
    subscribe;date;
    // MatPaginator Output
    // pageEvent: PageEvent;
    // endRequest;
    // setPageSizeOptions(setPageSizeOptionsInput: string) {
    //     this.matpageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);

    // }
    check(date){
       
           this.date= moment(date, this.formats, true).isValid()
            
           return this.date;
          
        
    }
    memberonly(){
  
        if(!this.local){
            this._nav.navigate(['login']);
            localStorage.setItem('member','latest-rfp' );
        }
        else if(!this.subscribe){
            this._nav.navigate(['pricing']);
            localStorage.setItem('member','latest-rfp' );
        
        }}
    move(){
        localStorage.setItem('location','latest-rfp')
      }
    page(pageSize) {
        if (pageSize) {
            this.pageSize = pageSize;
            if(localStorage.getItem('latestpage')){
                var page_num:number=Number(localStorage.getItem('latestpage'));
                this.setPage(page_num);
              }else{
                this.setPage(1);
              }
        }
        else {
            delete this.pageSize;
        }
    }
    enter:any=[];
    setPage(page) {
        localStorage.setItem('latestpage',page);
        this._serv.latestrfpecord(this.pageSize, page).subscribe(
            data => {

                this.record = data.results;
                
                this.item = data.totalItems;
               
                this.pager = this.pagerService.getPager(this.item, page,this.pageSize);
               
            },
            error => {
                this.record.splice(0, this.record.length);
               
            });
            this._compiler.clearCache()
    }
    download(info) {
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
    adminlogin;
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
        this.meta.updateTag({ name:'twitter:title', content:'Latest RFPs | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" }); this.meta.updateTag({ property:'og:title', content: 'Latest RFPs | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.Title.setTitle( 'Latest RFPs |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
        if(localStorage.getItem('latestpage')){
            var page_num:number=Number(localStorage.getItem('latestpage'));
            this.setPage(page_num);
          }else{
            this.setPage(1);
          }
        // this.setPage(1);
        this.check_login()
        if(localStorage.getItem('currentadmin')){
            this.adminlogin=localStorage.getItem('currentadmin')
          }
    }
    single(query) {
        let sth = 'rfp/' + query;
        this._nav.navigate([sth]);
    }
    paginator(pageEvent) { }
    check_login() {if(localStorage.getItem('currentadmin')){
        this.subscribe =localStorage.getItem('currentadmin')
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
    } btnEditClick(id, rfpkey, rfp_number, title, descriptionTag, state, agency, date_entered, due_date, web_info, rfp_reference, category, sub_category, seoTitleUrl, bid_type, agency_type, city_or_county, city, openrfp,oldcategory) {
        if(agency){
            var agen =agency.toLowerCase( );
                    }
        const dialogRef = this.dialog.open(EditRfpComponent, {
            width: '90%',
            height: '700px',
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
            oldcategory:oldcategory
            // CourseDetail: this.Courses
          }
        }).afterClosed()
        .subscribe(item => {
            if(localStorage.getItem('latestpage')){
                var page_num:number=Number(localStorage.getItem('latestpage'));
                this.setPage(page_num);
              }else{
                this.setPage(1);
              }
        });
    
      }
}