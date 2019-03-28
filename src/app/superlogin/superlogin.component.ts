import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RecapchaComponent } from '../recapcha/recapcha.component';
import { RecapchaService } from '../recapcha/recapcha.service';
import { Meta, Title } from '@angular/platform-browser';
import { LoginService } from '../login/login.service';

declare var $: any;
declare interface ValidatorFn {
  (c: AbstractControl): {
    [key: string]: any;
  };
}
declare interface User {
  username?: string; // required, must be 5-8 characters
  email?: string; // required, must be valid email format
  password?: string; // required, value must be equal to confirm password.
  confirmPassword?: string; // required, value must be equal to password.
  number?: number; // required, value must be equal to password.
  url?: string;
  idSource?: string;
  idDestination?: string;
  optionsCheckboxes?: boolean;
  staySignedIn;
  e;
}

@Component({
  selector: 'app-superlogin',
  templateUrl: './superlogin.component.html',
  styleUrls: ['./superlogin.component.scss'],
  providers: [LoginService]
})
export class SuperloginComponent implements OnInit {
  @ViewChild(RecapchaComponent) captcha: RecapchaComponent;
  isCaptcha=false;
  statuslogin: any;
  public typeValidation: User;
  register: FormGroup;
  login: FormGroup;
  type: FormGroup;
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  public username;
  staySignedIn:boolean=true;
  e;
  i;
  hide=true;
user;
  password;
  status;
  islogin = true;
  isequal;
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    });
}
  constructor( private _serv: LoginService,public router: Router, private element: ElementRef, private http: Http, private route: ActivatedRoute, private _nav: Router, private formBuilder: FormBuilder,public recapcha: RecapchaService,private Title: Title, private meta: Meta) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;

  }
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }

onLogin(e,username,password) {
  if (this.recapcha.check()) {
      this.isequal = true;
              this._serv.adminlogin(username, password).subscribe(
                  data => {
                      swal({
                          type: 'success',
                          title: 'Successfully Logged in',
                          showConfirmButton: false,
                          timer: 1500, width: '512px',
                      });
                      localStorage.setItem('selected_model', 'true')
                      localStorage.setItem('select_model', 'false')
                        this.router.navigate(['/admin-panel']);
  
                      // this._location.back();
                  },
                  error => {
                      swal(
                          'Invalid',
                          'Username OR Password',
                          'error'
                      )
                  });
         
  }
  else {
      this.captcha.resetImg();
      // this.captcha.reset();
      // this.isequal = false;

      swal({
          type: 'error',
          title: 'Please confirm you are not a robot!',
          showConfirmButton: false,
          width: '512px',
          timer: 2000
      });
  }
}
  checked(event, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.staySignedIn=true;
    }
    else if (event.target.checked == false) {
        console.log(event.target.checked)
        this.staySignedIn=false;

    }
   
}
  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content: 'Admin Login | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Admin Login |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    this.meta.updateTag({ property:'og:title', content: 'Admin Login | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
  }
  

}
