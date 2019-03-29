import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import {Http ,Headers , Response} from '@angular/http';
import { AgencyService} from './agency.service';
import {MatPaginatorModule} from '@angular/material';
import {PageEvent} from '@angular/material';
import { Router, RouterModule } from '@angular/router';
import swal from 'sweetalert2';
import {SharedData } from '../../shared-service';
import {PagerService} from '../rfp/paginator.service';
import * as moment from 'moment';
import {Location} from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../../serv/meta_service';
import { MatDialog } from '@angular/material';
import { EditRfpComponent } from '../../edit-rfp/edit-rfp.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
declare const $: any;
@Component({
  selector: 'app-agency-rfp',
  templateUrl: './agency-rfp.component.html',
  styleUrls: ['./agency-rfp.component.css'],
  
 providers: [PagerService,SharedData,AgencyService]
})
export class AgencyRfpComponent implements OnInit ,OnDestroy{
    date;
    age;
    move(){
        this.route.queryParams
    .subscribe(params => {
        this.age = params.agency
        localStorage.setItem('location','agency'+this.age)
    })
      }
    check(date){
         
      this.date= moment(date, this.formats, true).isValid()
    //    
      return this.date;
     
   
  }
  memberonly(){
    this.route.queryParams
    .subscribe(params => {
        this.age = params.agency
    if(!this.local){
        this._nav.navigate(['login']);
        localStorage.setItem('member','agency'+this.age)
    }
    else if(!this.subscribe){
        this._nav.navigate(['pricing']);
        localStorage.setItem('member','agency'+this.age)
    
    }
})}
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
    item;
    agency;
    record:any = [] ;
    pageValues ;

    currentUser;

    constructor(public dialog: MatDialog,private pagerService:PagerService,public _shareData: SharedData,private _nav:Router,private _serv: AgencyService ,private route: ActivatedRoute,private _location: Location,private Title: Title, private meta: Meta,private metaService: MetaService) {localStorage.removeItem('member');
    this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL(); }
    // MatPaginator Inputs
    length = 0;
    pageSize = '50';
    pageSizeOptions = [10, 20, 35, 50];
    pager: any = {};  

    status;
    local;
    uname;
    subscribe;
    // MatPaginator Output
    pageEvent: PageEvent;
    endRequest;
    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
        // console.log(this.pageSizeOptions);
    }
    page(pageSize){
        if (pageSize) {
          console.log(pageSize);
          this.pageSize = pageSize;
          if(localStorage.getItem('agencypage')){
            var page_num:number=Number(localStorage.getItem('agencypage'));
            this.subscribe_data(page_num);
          }else{
            this.subscribe_data(1);
          }
      }
      else {
          console.log()
          delete this.pageSize;
          console.log(this.pageSize)
      }
      }
    subscribe_data(page){
        localStorage.setItem('agencypage',page);
        this._shareData.returnagency().subscribe(
            data => {

                this.agency = data;
                console.log(data,"junaid");
                if(!data) {
                    this.route.queryParams
                        .subscribe(params => {
                            this.agency = params.agency
                            this.meta.updateTag({ name:'twitter:title', content: params.agency +' | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
                            this.meta.updateTag({ property:'og:title', content: params.agency +' | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });

                            this.Title.setTitle(  params.agency +' | RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
                        })
                }

                this.endRequest =   this._serv.staterecord(this.agency, this.pageSize, page).subscribe(
                    data => {
                        this.record = data.Results;
                        this.item = data.totalItems
                        this.length = this.item;
                        //  console.log(length);
                        //   console.log(data);
                        this.pager = this.pagerService.getPager(data['totalItems'], page,this.pageSize);
                    },
                    error => {
                        //   console.log(error);
                    });
            })
    }
    unsubscribe_data(){
        this._serv.unsub_staterecord(this.agency, this.pageSize, 1).subscribe(
            data => {
                this.record = data.Results;
                this.item = data.totalItems
                this.length = this.item;
                //  console.log(length);
                //   console.log(data);
            },
            error => {
                //   console.log(error);
            });
    }

    download(info){
//   console.log(info);
        this._serv.downloadFile(info).subscribe(
            data =>{
                if(data.status ="200"){
                    swal(
                        'File Downloaded Successfully!',
                        '',
                        'success'
                    )
                    //    console.log("dsdasd");
                }
            } ,
            error=>{

            });
    }
    adminlogin;
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
        if(localStorage.getItem('agencypage')){
            var page_num:number=Number(localStorage.getItem('agencypage'));
            this.subscribe_data(page_num);
          }else{
            this.subscribe_data(1);
          }
        // this.subscribe_data(1);
        if(localStorage.getItem('currentadmin')){
            this.adminlogin=localStorage.getItem('currentadmin')
          }
       

        this.check_login()
    }
    ngOnDestroy(){
        // this.endRequest.unsubscribe();
    }
    single(query){
        let sth = 'rfp/'+query;
        this._nav.navigate([sth]);
    }
    paginator(pageEvent) {

        // console.log(pageEvent)

        // this._serv.staterecord(this.state, this.pageEvent.pageSize, this.pageEvent.pageIndex).subscribe(
        //   data => {
        //       this.record = data.Results;
        //      this.item = data.totalItems
        //      this.length = this.item;
        //      console.log(length);
        //       console.log(data);
        //   },
        //   error => {
        //       console.log(error);
        //   });

    }
    onPaginateChange(event){
        const startIndex = event.pageIndex * event.pageSize;
        //   console.log(event);
        this._serv.staterecord(this.agency, event.pageSize, event.pageIndex+1).subscribe(
            data => {
                this.record = data.Results;
                this.item = data.totalItems
                this.length = this.item;
                //  console.log(length);
                //   console.log(data);
            },
            error => {
                //   console.log(error);
            });
    }
    check_login() {if(localStorage.getItem('currentadmin')){
        this.subscribe =localStorage.getItem('currentadmin')
      }
        if (localStorage.getItem('currentUser')) {
            this.local = localStorage.getItem('currentUser');
            let pars = JSON.parse(this.local) ;
            this.uname = pars.username
            this._serv.usersubscribe(this.uname).subscribe(
                data =>{
                    //   console.log(data.Response);
                    if(data.Response == "Subscribe user"){
                        this.subscribe = data.Response
                        return false
                    }
                },
                error =>{
                    // console.log(error);
                });

        }
        else {
            return true
        }
    }

    btnEditClick(id, rfpkey, rfp_number, title, descriptionTag, state, agency, date_entered, due_date, web_info, rfp_reference, category, sub_category, seoTitleUrl, bid_type, agency_type, city_or_county, city, openrfp,oldcategory) {
        if(agency){
            var agen =agency.toLowerCase( );
                    }
        const dialogRef = this.dialog.open(EditRfpComponent, {
            width:'80%',
            height:'600px',
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
            if(localStorage.getItem('agencypage')){
                var page_num:number=Number(localStorage.getItem('agencypage'));
                this.subscribe_data(page_num);
              }else{
                this.subscribe_data(1);
              }
        });
    
      }
}
