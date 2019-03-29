import { Component, OnInit, Inject , ElementRef, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { AdminPanelComponent } from '../admin-penal/admin-penal.component';
import { PagerService } from './../rfps/rfp/paginator.service';
import { AllRfpsService } from '../all/all-rfps/all-rfps.service'; import { AdvanceService } from '../advance-search/advance.service';
import {  FormControl } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import { HttpService } from '../serv/http-service';
import swal from 'sweetalert2'
import { Headers, Http, Response } from '@angular/http';
import {SharedData} from '../shared-service';
import { from } from 'rxjs';
@Component({
  selector: 'app-edit-rfp',
  templateUrl: './edit-rfp.component.html',
  styleUrls: ['./edit-rfp.component.scss'],
  providers: [PagerService, AllRfpsService, AdvanceService,SharedData]
})
export class EditRfpComponent implements OnInit { 
  cate:any=[];
  model: any = [];
  agencie: boolean = false;
  category: boolean = false;
  record_added: boolean = true;
  subcate: boolean = false;
  statsearch; agensearch; catsearch; subcatsearch;
  Statess: any = []; cat: any = []; agen: any = [];
  sub_categories;
  date_entered = ''; due_date = ''; web_info; rfp_reference = '';
  constructor(private shared:SharedData, private http: HttpService,private _http: HttpService, private _serv1: AdvanceService, private _serv: AllRfpsService, public dialogRef: MatDialogRef<AdminPanelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  remove1(val, index){
    console.log(val);
    this.data.subcat.splice(index, 1);
  }
  remove(val, index) {
    console.log(val);
    this.data.category.splice(index, 1);
    // this.valueSelected(preference, status);
    // console.log(this.tempUserPreference);
}
hide1:boolean=false;
selectsubcate(){
  this.hide1=true;
}
  acgeny_check() {
    this.agencie = true;
  }
  cat_check() {
    this.category = true;
  }
  subchk() {
    this.subcate = true;
  }
  select_oldcat() {
    
    this._serv1.oldcategories(this.data.oldcategory).subscribe(
      data => {
       
        if (data.category) {
        this.data.category = data.category;
        this._serv1.rfpsubcat(this.data.category).subscribe(
          data => {
            this.sub_categories = data.sub_categories;
          }
        )
        }
      if(data.sub_category){
        this.data.subcat=data.sub_category;
      }

      })
  
  // if (this.states) {
  //   delete this.agencies
  //   delete this.cates;
  //   delete this.subcate;
  // }

}
  select_state() {
    
    this._serv1.admindropdown(this.data.state).subscribe(
      data => {
       
        if (data.Agencies) {
        this.agen = data.Agencies;

        }
      

      })
  
  // if (this.states) {
  //   delete this.agencies
  //   delete this.cates;
  //   delete this.subcate;
  // }

}
  ngOnInit() {
    this._serv1.rfpstate().subscribe(
      data => {
        this.Statess = data.Result;
      },
      error => {
        // console.log(error);
      }); this._serv1.rfpcategory().subscribe(
        data => {
          this.cat = data;
        },
        error => {
          // console.log(error);
        }
      )
    this._serv1.rfpagen().subscribe(
      data => {
        this.agen = data.Result;
      }
    )

    this._serv1.rfpsubcat(this.data.category).subscribe(
      data => {
        this.sub_categories = data.sub_categories;
      }
    )
  }
  hide:boolean=false;
  subcategory(value) {
    this.hide=true
    this._serv1.rfpsubcat(value).subscribe(
      data => {
        this.sub_categories = data.sub_categories;
      }
    )
  }
  input;
  onChange(event: EventTarget) {

      this.input = new FormData();
      const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
      const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
      this.input.append('fileToUpload', target.files[0]);
    }
  editClick() {
    if(this.input){
    this._http.post('https://storage.rfpgurus.com/upload.php/',this.input).subscribe(data => { 
          console.log(data);

          this.data.web_info = data._body;
          console.log(data._body.substring(0,26),"Sorry, file already exists.")
          if(data._body.substring(0,26)=="Sorry, file already exists"){
            swal({
              type: 'error',
              title: 'Opps! The file is already exist!',
              showConfirmButton: false,
              timer: 1500,width: '512px',
            });
          }else{
            this._serv.update_rfp(this.data.id, this.data.rfp_number, this.data.rfpkey, this.data.title, this.data.descriptionTag, this.data.state, this.data.agency, this.data.date_entered, this.data.due_date, this.data.web_info, this.data.rfp_reference, this.data.category, this.data.subcat, this.data.seoTitleUrl, this.data.bid_type, this.data.agency_type, this.data.city_or_county, this.data.city, this.data.open_rfp, this.record_added, this.data.data_model,this.data.oldcategory).subscribe(
            data => {
      
              if (data) {
                swal({
                  type: 'success',
                  title: 'Updated Successfully',
                  showConfirmButton: false,
                  width: '512px',
                  timer: 2500
                })
              }
              this.dialogRef.close();
      
            }, error => {
              swal({
                type: 'error',
                title: 'Something Went Wrong',
                showConfirmButton: false,
                width: '512px',
                timer: 2500
              })
            }
      
          );
        }
           });
   
    
  }else{
    this._serv.update_rfp(this.data.id, this.data.rfp_number, this.data.rfpkey, this.data.title, this.data.descriptionTag, this.data.state, this.data.agency, this.data.date_entered, this.data.due_date, this.data.web_info, this.data.rfp_reference, this.data.category, this.data.subcat, this.data.seoTitleUrl, this.data.bid_type, this.data.agency_type, this.data.city_or_county, this.data.city, this.data.open_rfp, this.record_added, this.data.data_model,this.data.oldcategory).subscribe(
      data => {

        if (data) {
          swal({
            type: 'success',
            title: 'Updated Successfully',
            showConfirmButton: false,
            width: '512px',
            timer: 2500
          })
        }
        this.dialogRef.close();

      }, error => {
        swal({
          type: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          width: '512px',
          timer: 2500
        })
      }

    );
  }
}
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
