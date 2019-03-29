import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SharedData } from './../shared-service';
import { PagerService } from './../rfps/rfp/paginator.service';
import { AllRfpsService } from '../all/all-rfps/all-rfps.service';
declare const $: any;
import { Compiler } from '@angular/core';
import * as moment from 'moment';
import { Headers, Http, Response } from '@angular/http';
import { HttpService } from '../serv/http-service';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';
import { AdvanceService } from '../advance-search/advance.service';
import { MatDialog } from '@angular/material';
import { EditRfpComponent } from '../edit-rfp/edit-rfp.component';


@Component({
    selector: 'app-admin-penal',
    templateUrl: './admin-penal.component.html',
    providers: [PagerService, AllRfpsService, SharedData]

})
export class AdminPanelComponent implements OnInit {
    item;
    filter;
    state;
    record: any = [];
    currentUser;
    length = 0;
    constructor(private _compiler: Compiler, private pagerService: PagerService, public _shareData: SharedData, private _nav: Router, private _serv: AllRfpsService, private _serv1: AdvanceService, private route: ActivatedRoute, private http: HttpService, private Title: Title, private meta: Meta, private metaService: MetaService, public dialog: MatDialog) { this.metaService.createCanonicalURL(); this.metaService.metacreateCanonicalURL();
       
    }
   
    // MatPaginator Inputs
    // length
    pageSize = "10";
    matpageSizeOptions = [10, 20, 35, 50];
    pager: any = {};
    end;
    status;
    local;
    uname;
    url: any = 'JPG, GIF, PNG';
    select_model: boolean = JSON.parse(localStorage.getItem('select_model'));
    selected_model: boolean = JSON.parse(localStorage.getItem('selected_model'));
    setmodel() {
        if (this.select_model == true) {
            this.selected_model = true
            localStorage.setItem('select_model', 'false')
            localStorage.setItem('selected_model', 'true')
            if(localStorage.getItem('adminpage')){
                var page_num:number=Number(localStorage.getItem('adminpage'));
                this.setPage(page_num);
              }else{
                this.setPage(1);
              }
        } else if (this.select_model == false) {
            this.selected_model = false
            localStorage.setItem('select_model', 'true')
            localStorage.setItem('selected_model', 'false')
            if(localStorage.getItem('adminpage')){
                var page_num:number=Number(localStorage.getItem('adminpage'));
                this.setPage(page_num);
              }else{
                this.setPage(1);
              }

        }
    }
    subscribe; date;
    move() {
        localStorage.setItem('location', 'admin-panel')
      }
    
    page(pageSize) {
        if (pageSize) {
            console.log(pageSize);
            this.pageSize = pageSize;
            if(localStorage.getItem('adminpage')){
                var page_num:number=Number(localStorage.getItem('adminpage'));
                this.setPage(page_num);
              }else{
                this.setPage(1);
              }
        }
        else {
            console.log()
            delete this.pageSize;
            console.log(this.pageSize)
        }
    }
    Res:any;
    enter: any = [];
   
    setPage(page) {
        localStorage.setItem('adminpage',page)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (this.selected_model == true) {
            if(this.filter ==''){
                delete this.filter;
            }
                if(this.filter){
                    this._serv.fiter_rfp(this.filter,'new',page).subscribe(
                        Res => {
                    
                            this.Res=Res;
                            this.record = this.Res['Results'];
                            this.item = this.Res['TotalResult'];
                            console.log(this.record, this.Res['TotalResult'], 'eee')
                            this.pager = this.pagerService.getPager(this.item, page, this.pageSize);
                        })
                }else{
                    this.http.get('https://apis.rfpgurus.com/rf_p/all_rfp_cleaning/' + this.pageSize + '?page=' + page, { headers: headers })
                    .subscribe(Res => {
                        
                        this.Res=Res;
                        this.record = this.Res.json()['Results'];
                        this.item = this.Res.json()['TotalResult'];
                        console.log(this.record, this.Res.json()['TotalResult'], 'eee')
                        this.pager = this.pagerService.getPager(this.item, page, this.pageSize);
                        // this.search = false;
    
                    });
                }
        }
        else if (this.selected_model == false) {
            if(this.filter ==''){
                delete this.filter;
            }
                if(this.filter){
                    this._serv.fiter_rfp(this.filter,'old',page).subscribe(
                        Res => {
                    console.log(Res);
                            this.Res=Res;
                            this.record = this.Res['Results'];
                            this.item = this.Res['TotalResult'];
                            console.log(this.record, this.Res['TotalResult'], 'eee')
                            this.pager = this.pagerService.getPager(this.item, page, this.pageSize);
                        })
                }else{
                    this.http.get('https://apis.rfpgurus.com/rf_p/all_rfp_data_old_table/' + this.pageSize + '?page=' + page, { headers: headers })
                .subscribe(Res => {
                    this.Res=Res;
                    this.record = this.Res.json()['Results'];
                    this.item = this.Res.json()['TotalResult'];
                    console.log(this.record, this.Res.json()['TotalResult'], 'eee')
                    this.pager = this.pagerService.getPager(this.item, page, this.pageSize);
                    // this.search = false;

                });
                }
        }
    }

    select() {
        if (this.selected_model == false) {
            // alert(this.selected_model)
            localStorage.setItem('selected_model', 'false')
        }
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
    Statess: any = [];
    ngOnInit() {
       
       
        this.meta.updateTag({ name: 'twitter:title', content: 'Admin Panel | ' + "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" }); this.meta.updateTag({ property: 'og:title', content: 'Admin Panel | ' + "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.Title.setTitle('Admin Panel |' + ' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
      
        if(localStorage.getItem('adminpage')){
            var page_num:number=Number(localStorage.getItem('adminpage'));
            this.setPage(page_num);
          }else{
            this.setPage(1);
          }
        this.check_login()
        this._serv1.rfpstate().subscribe(
            data => {
                this.Statess = data.Result;
            },
            error => {
                // console.log(error);
            });
    }
    single(query) {
        let sth = 'rfp/' + query;
        this._nav.navigate([sth]);
    }
    paginator(pageEvent) { }
    check_login() {
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
                    // console.log(error);
                });
        }
        else {
            return true
        }
    }
    // input;
    // onChange(event: EventTarget) {

    //     this.input = new FormData();
    //     const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    //     const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    //     this.input.append('fileToUpload', target.files[0]);
    //   }


    btnEditClick(id, rfpkey, rfp_number, title, descriptionTag, state, agency, date_entered, due_date, web_info, rfp_reference, category, sub_category, seoTitleUrl, bid_type, agency_type, city_or_county, city, openrfp,oldcategory) {
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
                data_model: this.selected_model,
                oldcategory:oldcategory
                // CourseDetail: this.Courses
            }
        }
        ).afterClosed()
  .subscribe(item => {
    if(localStorage.getItem('adminpage')){
        var page_num:number=Number(localStorage.getItem('adminpage'));
        this.setPage(page_num);
      }else{
        this.setPage(1);
      }
  });

    }
    model: any = {};
    // uploadfiles() {
    //     this.http.post(Config.uploadfile, this.input, { responseType: 'text' }).subscribe(data => {
    //       if (data === 'sorry ,  your file was not uploaded') {
    //         this.CourseFailure();
    //       }
    //       else {
    //         this.model.datafile = data;
    //         console.log(this.model.datafile);
    //       }
    //     })
    //   }

    // editClick(updatedtitle,updatedrfp_number,uprfpkey,updateddescriptionTag,updatedstates,updatedagency,updateddate_entered,updateddue_date,updatedrfp_reference,updatedcategory,updatedsubcat,updatedseoTitleUrl,updatedbid_type,updatedagency_type,updatedcity_or_county,updatedcity,updatedweb_info,updatedopen_rfp){
    //     // if(this.input){
    //     // this.http.post('https://storage.rfpgurus.com/bplrfpgurus/',this.input,{ responseType: 'text' }).subscribe(data => { 
    //     //       console.log(data);

    //     //       this.model.web_info = data;



    //     //   });}
    //     this._serv.update_rfp(this.id,updatedtitle,updatedrfp_number,uprfpkey,updateddescriptionTag,updatedstates,updatedagency,updateddate_entered,updateddue_date,updatedweb_info,updatedrfp_reference,updatedcategory,updatedsubcat,updatedseoTitleUrl,updatedbid_type,updatedagency_type,updatedcity_or_county,updatedcity,updatedopen_rfp).subscribe(
    //         data => {

    //         });
    // }
}

