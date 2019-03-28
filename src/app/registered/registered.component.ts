import { Component, OnInit,Inject,PLATFORM_ID,OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import swal from 'sweetalert2';
import { ErrorStateMatcher} from '@angular/material';
import { RegisterService } from './register.service';
import {  Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import {RecapchaComponent} from '../recapcha/recapcha.component';
import {isPlatformBrowser} from '@angular/common';
import { RecapchaService } from '../recapcha/recapcha.service';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

export class errorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
declare interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}
declare interface User {
    text?: string; // required, must be 5-8 characters
    email?: string; // required, must be valid email format
    password?: string; // required, value must be equal to confirm password.
    confirmPassword?: string; // required, value must be equal to password.
    number?: number; // required, value must be equal to password.
    url?: string;
    idSource?: string;
    idDestination?: string;
    optionsCheckboxes?: boolean;
    // firstname?: string;
}
@Component({
    selector: 'app-registered',
    templateUrl: './registered.component.html',
    styleUrls: ['./registered.component.css'],
    // providers: [RegisterService]
})

export class RegisteredComponent implements OnInit,OnDestroy {
    @ViewChild(RecapchaComponent) captcha: RecapchaComponent;
    endRequest;
    hide = true;
    phone;
    public typeValidation: User;
    register: FormGroup;
    emailVerify: FormGroup;
    login: FormGroup;
    type: FormGroup;
    digitsOnly = '^[0-9,-]+$';
    password_regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
    emailonly = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    usernameOnly = '[a-zA-Z0-9_.]+';
    // textonly='/^([a-z]+\s)*[a-z]+$/';
textonly='[a-zA-Z]+'
    emailexist: boolean = false;
    usernameexist: boolean = false;
    isequal;
    matcher = new errorMatcher();
    vin_Data = { "city": "", "state": "","country": "" };
    public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public logedin: any = 0;
    
    constructor(@Inject(PLATFORM_ID) private platformId: Object,private _serv: RegisterService, private formBuilder: FormBuilder, private router: Router,public recapcha: RecapchaService,private Title: Title, private meta: Meta,private metaService: MetaService) {
    this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();}

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }
    resolved(captchaResponse: string) {
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }
   
    zipcodeCheck(zipcode1) {
        if (zipcode1.length > 4) {
           this.endRequest=this._serv.zipcode(zipcode1).subscribe(
                data => {
                    this.vin_Data = data
                },
                error => {
                    // console.log(error)
                });
        }
    }
    usernameCheck(username1) {
       this.endRequest= this._serv.username_exist(username1).subscribe(
            data => {
                this.usernameexist = data;

            },
            error => {
                //  console.log(error)
            }
        );
    }
    emailCheck(email1) {
        // console.log("sdfsdfsdfsdfsdf",email1);
       this.endRequest= this._serv.email_exist(email1).subscribe(
            data => {
                this.emailexist = data;
            },
            error => {
                //  console.log("dsadas",error)
            }
        );
    }

    onRegister(value) {
        // alert(this.register.value.phone)
        if (this.register.valid && this.recapcha.check()) {
            this.isequal=true;
           this.endRequest= this._serv.post_service(this.register.value).subscribe(
                data => {
                    this.send_link(this.register.value.email);
                    this.router.navigate(['/login']);
                },
                error => {
                });
        } else {
            this.validateAllFormFields(this.register);
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
    send_link(email) {
       this.endRequest= this._serv.activation_service(email).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'Please check your email for account activation instructions',
                    showConfirmButton: true,
                    width: '512px',
                });
            },
            error => {
            });
    }
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
    ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'Sign Up | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.meta.updateTag({ property:'og:title', content: 'Sign Up | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.Title.setTitle( 'Sign Up |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
        if (isPlatformBrowser(this.platformId)) {
            this.logedin = localStorage.getItem('loged_in');
            // alert(this.logedin)
        }
        if (this.logedin == 1)
        {

            this.router.navigate(['/']);
        }
        this.emailVerify = this.formBuilder.group({
            code: ['', Validators.required]
        });
        this.register = this.formBuilder.group({
            firstname: ['', Validators.compose([Validators.required,Validators.pattern(this.textonly)])],
            lastname: ['', Validators.compose([Validators.required,Validators.pattern(this.textonly)])],
            companyname: ['', Validators.compose([Validators.required])],
            address: ['', Validators.compose([Validators.required])],
            zipcode: ['', Validators.compose([Validators.required, Validators.pattern(this.digitsOnly), Validators.minLength(5)])],
            city: ['', Validators.compose([Validators.required])],
            country: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            phone: ['', Validators.compose([Validators.required])],
            username: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly)])],
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailonly)])],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            // optionsCheckboxes: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.pattern(this.password_regex), Validators.maxLength(100)])],
            confirmPassword: ['', Validators.compose([Validators.required,,Validators.pattern(this.password_regex)])],
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        });
    }
    ngOnDestroy(){
        // this.endRequest.unsubscribe();
    }
}
