import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { PricingService } from './pricing.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { RfpService } from '../rfps/single-rfp/rfp.service';
import { PaymentmethodsService } from '../admin/paymentmethods/paymentmethods.service';
import {Location} from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';
import {FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import { RegisterService } from '../registered/register.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricingsteps.component.scss'],
  providers: [PricingService, RfpService]
})
export class PricingComponent implements OnInit {
  pkgsub = false;
  pkg_detail = {};
  valuee;
  CCV: FormGroup;
  CardNumber = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$';
  ExpiryDate= '([0-9]{2}[/]?){2}';

  firststep(value) {
    console.log(value)
    this.valuee = value;
    if (value == "BM") {
      this.prv_stepdetail("B", "M")
    }
    else if (value == "PY") {
      this.prv_stepdetail("P", "Y")
    }
  }
  prv_stepdetail(type, dur) {
    this.pkg_detail['type'] = type
    this.pkg_detail['dur'] = dur
    this.pkgsub = true;
  }
  ngOnInit() {
    this.meta.updateTag({ name:'twitter:title', content:'Pricing | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'Pricing | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Pricing |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

    if (localStorage.getItem('currentUser')){ this.endRequest = this._serv.get_card_info().subscribe(Data => {
      this.res = Data;})
    this.route.queryParams

      .subscribe(params => {
        this.firststep(params.value)
        
      })}
   
  }
  res;
  status;
  // cardtype;
  // holdername
  usernameOnly = '[a-zA-Z]+';

  public model: any = {};
  var_get_status;var_get_id;
  card_opeation=[
    {value: 'Visa', viewValue: 'Visa Card'},
    {value: 'Mastercard', viewValue: 'Master Card'},
    {value: 'American Express', viewValue: 'American Express'},
    {value: 'Discover', viewValue: 'Discover'}
    
    ];
 
    ExpiryDateForm = new FormControl('', [
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$'),
    ]);
  
    CardNumberForm = new FormControl('', [
      Validators.required,
    ]);
  
    CardCodeForm = new FormControl('', [
      Validators.required,
    
    ]);
    Holdername = new FormControl('', [
      Validators.required
    ]);
    CardtypeForm = new FormControl('', [
      Validators.required,
      
    ]);
    address = new FormControl('', [
      Validators.required,
      
    ]);
    Carddefault = new FormControl('', [
     
      
    ]);
    zipcode= new FormControl('', [
      Validators.required,Validators.maxLength(5),
      Validators.pattern('^[0-9]*$')
      
    ]);
    city=new FormControl('', [
      Validators.required,
      
    ]);
    state=new FormControl('', [
      Validators.required,
      
    ]);
    country=new FormControl('', [
      Validators.required,
      
    ]);
    nickname=new FormControl('', [
      Validators.required,
      
    ]);
    // TotalAmountForm = new FormControl('', [
    //   Validators.required
    // ]);
    setautopay:boolean=false;

    changed(val) {
      console.log(val.checked)
     this.setautopay=val.checked
    }
    zipcodeCheck(zipcode1) {
      if (zipcode1.length > 4) {
        this.endRequest = this._serv2.zipcode(zipcode1).subscribe(
          data => {
            this.model.city=data.city;
            this.model.state=data.state;
            this.model.country=data.country;
          },
          error => {
          });
      }
    }
    expirydate;
    chek(val){
      // this.expirydate=val.toString().slice(3,7);
      this.expirydate=val.toString().slice(3,5);
      console.log(this.expirydate,'jj')
    }
    public mask=function(rawValue) {
     
      // add logic to generate your mask array  
      if (rawValue && rawValue.length > 0) {
          if (rawValue[0] == '0' || rawValue[5] == '1') {
              return [/[01]/, /[1-9]/, '/',  /[0-9]/, /[0123456789]/];
          } else {
              return [/[01]/, /[0-2]/, '/',  /[0-9]/, /[0123456789]/];
          }
      }
      return [/[01]/, /[0-9]/, '/',  /[0-9]/, /[0123456789]/];
      
  }
    endRequest ;
    public ccvmask =[/[0-9]/, /\d/, /\d/];
    public cardmask =[/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
    ShowButton(var_type_atm) {
      // this.cardtype = var_type_atm;
      if (var_type_atm == "American Express") {
       this.cardmask = [/[3]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
       this.ccvmask=[/[0-9]/, /\d/, /\d/,/\d/]
      }
      else if (var_type_atm == "Visa") {
       this.cardmask=[/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
       this.ccvmask=[/[0-9]/, /\d/, /\d/]
      }
      else if (var_type_atm == "Mastercard") {
        this.cardmask=[/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        this.ccvmask=[/[0-9]/, /\d/, /\d/]
       } else{
        this.cardmask=[/[6]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        this.ccvmask=[/[0-9]/, /\d/, /\d/]
       }
    }
    isright:boolean=false;
    set_default:boolean=false;
    Add_new(){
    if(this.set_default==true){
      this.isright=false;
    }else if(this.set_default==false){
    this.isright=true;
    
    }
    }
    check_login() {
      if (localStorage.getItem('currentUser')) {
        this.local = localStorage.getItem('currentUser');
        let pars = JSON.parse(this.local);
        this.uname = pars.username
        return false
      }
      else {
        return true
      }
    }
  
    local;
    uname;
    date;
    default: boolean = false;

   proceed() {
    this.local = localStorage.getItem('currentUser');
    let pars = JSON.parse(this.local);
    this.uname = pars.username
    this.date = this.model.expirationdate;
    if(this.isright==true){
    
      
       this._http6.addCard(this.default, this.model.holdername, this.model.address, this.model.zipcode, this.model.city, this.model.state, this.model.country, this.model.cardNumber.split('-').join(''), this.model.cardcod,this.date.split('/').join(''),this.model.cardtype,this.model.setautopay,this.model.nickname).subscribe(Data => {

          this.model.defaultcard=Data.id
          if(Data.id){
          this._serv.package_free(this.isright,this.model.defaultcard, this.model.expirationdate,this.model.cardcod,this.var_get_id,this.model.cardtype,this.model.holdername,this.pkg_detail['type'],this.pkg_detail['dur']).subscribe(
            data => {
              swal(
                'Your payment has been transferred',
                '',
                'success'
              )
              if(localStorage.getItem('member')){
                let url =localStorage.getItem('member')
                let last=url.length
      let ur =url.slice(0,13)
      let state=url.slice(0,5)
      let category=url.slice(0,8)
      let agency=url.slice(0,6)
            
            if(ur == 'searched-data'){ this._nav.navigate([ur], { queryParams: { keyword: url.slice(13,last) } });  }
            else if(state == 'state'){
                this._nav.navigate([state], { queryParams: { state: url.slice(5,last) } });  }
                else if(category == 'category'){
                 this._nav.navigate([category], { queryParams: { cat: url.slice(8,last) } });  }
                 else if(agency == 'agency'){
                   
                     this._nav.navigate([agency], { queryParams: { agency: url.slice(6,last) } });  }
            else{
                this._nav.navigate([url]);
            }
        }else{
            this._nav.navigate(['/']);
        }
            },
      
            error => {
              swal(
                'Oops...',
                'Something went wrong!',
                'error'
              )
            });}else{
              swal(
                'Oops...',
                'Something went wrong! Please Try Again.',
                'error'
              )
            }
        },
          error => {
         
          })
      
        
   
  }else if(this.isright==false){
    this._serv.package_free(this.isright,this.model.defaultcard, this.model.expirationdate,this.model.cardcod,this.var_get_id,this.model.cardtype,this.model.holdername,this.pkg_detail['type'],this.pkg_detail['dur']).subscribe(
      data => {
        swal(
          'Your payment has been transferred',
          '',
          'success'
        )
        if(localStorage.getItem('member')){
          let url =localStorage.getItem('member')
          let last=url.length
let ur =url.slice(0,13)
let state=url.slice(0,5)
let category=url.slice(0,8)
let agency=url.slice(0,6)
      
      if(ur == 'searched-data'){ this._nav.navigate([ur], { queryParams: { keyword: url.slice(13,last) } });  }
      else if(state == 'state'){
          this._nav.navigate([state], { queryParams: { state: url.slice(5,last) } });  }
          else if(category == 'category'){
           this._nav.navigate([category], { queryParams: { cat: url.slice(8,last) } });  }
           else if(agency == 'agency'){
             
               this._nav.navigate([agency], { queryParams: { agency: url.slice(6,last) } });  }
      else{
          this._nav.navigate([url]);
      }
  }else{
      this._nav.navigate(['/']);
  }
      },

      error => {
        swal(
          'Oops...',
          'Something went wrong!',
          'error'
        )
      });
    }
     
    }
constructor(private route: ActivatedRoute, private _serv1: RfpService, private _nav: Router, private _serv: PricingService,private _serv2: RegisterService, private http: Http, private _http6: PaymentmethodsService,private _location: Location,private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();}
}
