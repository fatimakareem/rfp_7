import { Component, OnInit, Inject } from '@angular/core';
import { AdminPanelComponent } from '../admin-penal/admin-penal.component';
import { PagerService } from './../rfps/rfp/paginator.service';
import { AllRfpsService } from '../all/all-rfps/all-rfps.service';
 import { AdvanceService } from '../advance-search/advance.service';
 import swal from 'sweetalert2';
 import { Router, NavigationEnd } from '@angular/router';
 import { HttpService } from '../serv/http-service';

@Component({
  selector: 'app-add-rfp',
  templateUrl: './add-rfp.component.html',
  styleUrls: ['./add-rfp.component.scss'],
  providers: [PagerService, AllRfpsService]
})
export class AddRfpComponent implements OnInit {
  data:any=[];url;
  agency_show:boolean=false;
  category_show:boolean=false;
  subcate_show:boolean=false;
  oldcategory;
  rfpkey = ''; statsearch; agensearch; catsearch; subcatsearch;
  Statess: any = []; cat: any = []; agen: any = [];
  rfp_number;
  title;
  governmentbidsusers;
  descriptionTag;
  states; sub_categories;
  id; web_infoo;
   subcat; seoTitleUrl; bid_type; agency_type; city_or_county; city;
  date_entered; due_date; web_info; rfp_reference;
  constructor(private _http: HttpService,private _serv1: AdvanceService, private _serv: AllRfpsService,private router: Router ) {
    swal({
      title: 'Enter Profile URL',
      // html: ' Enter you email address to receive a link allowing you to reset your password.',
      input: 'url',
      allowOutsideClick: false,
      showCancelButton : true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      inputPlaceholder: 'Enter Profile URL'
    }).then((url) => {
      // alert(result)
      // if (url) {
        this.url=url;
        this._serv.post_url(url).subscribe(
          data => {
    if(data){
      this.governmentbidsusers=data.id
    }else{
      
      delete this.governmentbidsusers;
     
    }
          });
      // }else{
      //   swal(
      //     'Please Enter Profile URL',
      //     'Invalid!',
      //     'error'
      // )
      // }
     
    }
    ).catch(error => {
      this.router.navigate(['/admin-panel']);
    })
   }
  acgeny_check(){
    this.agency_show=true;
      }
      cat_check(){
        this.category_show=true;
      }
      subchk(){
        this.subcate_show=true;
      }
  ngOnInit() {
    
    this._serv1.rfpstate().subscribe(
      data => {
        this.Statess = data.Result;
      },
      error => {
      }); this._serv1.rfpcategory().subscribe(
        data => {
          this.cat = data;
        },
        error => {
        }
      )
    this._serv1.rfpagen().subscribe(
      data => {
        this.agen = data.Result;
      }
    )

    
  }
  remove1(val, index){
    this.subcat.splice(index, 1);
  }
  remove(val, index) {
    this.category.splice(index, 1);
    
}
  subcategory(value) {
    this._serv1.rfpsubcat(value).subscribe(
      data => {
        this.sub_categories = data.sub_categories;
      }
    )
  }
  select_state() {
    
      this._serv1.admindropdown(this.states).subscribe(
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
  hide:boolean=false;
   select_oldcat() {
    this.hide=true;
    this._serv1.oldcategories(this.oldcategory).subscribe(
      data => {
       
        if (data.category) {
        this.category = data.category;
        this._serv1.rfpsubcat(this.category).subscribe(
          data => {
            this.sub_categories = data.sub_categories;
          }
        )
        }
      if(data.sub_category){
        this.subcat=data.sub_category;
      }

      })
  
  // if (this.states) {
  //   delete this.agencies
  //   delete this.cates;
  //   delete this.subcate;
  // }

}
  open_rfp:boolean=false;record_added:boolean=true;
  agency;
  category;
  input
  onChange(event: EventTarget) {

    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }
  editClick() {
   
    if(this.input){
    this._http.post('https://storage.rfpgurus.com/upload.php/',this.input).subscribe(data => { 

          this.web_info = data._body;

if(data._body.substring(0,26)=="Sorry, file already exists"){
  swal({
    type: 'error',
    title: 'Opps! The file is already exist!',
    showConfirmButton: false,
    timer: 1500,width: '512px',
  });
}else{
  this._serv.add_rfp(this.rfpkey,this.governmentbidsusers,this.title,this.descriptionTag,this.states,this.agency,this.date_entered,this.due_date,this.web_info,this.rfp_reference,this.category,this.subcat,this.seoTitleUrl,this.bid_type,this.agency_type,this.city_or_county,this.city,this.open_rfp,this.record_added,this.oldcategory,this.url).subscribe(
    data => {
      swal({
        type: 'success',
        title: 'RFP Added successfully!',
        showConfirmButton: false,
        timer: 1500,width: '512px',
      });
    },error =>{
      swal({
        type: 'error',
        title: 'Opps Something went wrong!',
        showConfirmButton: false,
        timer: 1500,width: '512px',
      });
    }
    
    );
}

      });

    
  }
}
}
