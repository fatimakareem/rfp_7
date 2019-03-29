import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { MainService } from '../../serv/main.service';
import { DatePipe } from '@angular/common';
import { AuthService } from "angular4-social-login";
import { AdvanceService } from '../../advance-search/advance.service';
declare const $: any;
import {MatChipInputEvent} from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../../serv/meta_service';


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
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [AdvanceService, AuthService, ProfileService, MainService]
})
export class ProfileComponent implements OnInit, OnDestroy {
    endRequest;
    today: number = Date.now();
    record = [];
    result: boolean = false;
    public typeValidation: User;
    register: FormGroup;
    emailVerify: FormGroup;
    login: FormGroup;
    type: FormGroup;
    pkgsub = false;
    profile: any = [];
    personal: any = [];
    local;
    options: FormGroup;
    uname;
    usernameexist;
    vin_Data = { "city": "", "state": "" };
    emailexist;
    digitsOnly = '^[0-9,-]+$';
    
    public phoneMask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    constructor(private authService: AuthService, private _nav: Router, private _serv: ProfileService, private datePipe: DatePipe, private formBuilder: FormBuilder, private _adserv: AdvanceService, private _ser: MainService,private title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();
        if (localStorage.getItem('currentUser')) {
            this.local = localStorage.getItem('currentUser');
            let pars = JSON.parse(this.local);
            this.uname = pars.username
            this.endRequest = this._serv.get_profile(this.uname).subscribe(
                data => {
                    console.log('Profile Data issssss', data);
                    console.log(data.user);
                    this.personal = data;
                    this.profile = data.user;
                    
                },
                error => {
                    // console.log(error);
                });
        }
        this.options = formBuilder.group({
            bottom: 0,
            fixed: false,
            top: 0
        });
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
    zipcodeCheck(zipcode1) {
        if (zipcode1.length > 4) {
            this.endRequest = this._serv.zipcode(zipcode1).subscribe(
                data => {
                    this.personal['city'] = data.city
                    this.personal['state'] = data.state
                    this.personal['country'] = data.country
                },
                error => {
                    // console.log(error)
                });
        }
    }
    usernameCheck(username1) {
        this.endRequest = this._serv.username_exist(username1).subscribe
            (
            data => {
                this.usernameexist = data;
                // console.log(data);
            },
            error => {
             
            }
            );
    }
    emailCheck(email1) {
        this.endRequest = this._serv.email_exist(email1).subscribe
            (
            data => {
                this.emailexist = data;
            },
            error => {
        
            }
            );
    }
    onRegister() {
        if (this.register.valid) {
           
            this.endRequest = this._serv.ProfileUpdate(this.register.value).subscribe(
                data => {
                    swal({
                        type: 'success',
                        title: 'Updated Your Profile',
                        showConfirmButton: false,
                        timer: 1500,width: '512px',
                    })
                },
                error => {
                    // console.log(error)
                });
        } else {
            this.validateAllFormFields(this.register);
            swal(
                'Oops...',
                'Failed to Update Profile. Inccorrect Information!',
                'error'
            )
        }
    }
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            // console.log(field);
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
    mainFunction() {
        this.endRequest = this._ser.purchaseHistory().subscribe(
            data => {
                this.record = data;
                this.result = true;
                var enddate = this.record[0].end_date.toString();
                var date = new Date();
                var currentDate = this.datePipe.transform(date, "yyyy-MM-dd").toString()
                if (enddate <= currentDate && this.record[0].is_paid == true) {
                    this.endRequest = this._ser.expirePackage(enddate).subscribe(data => {
                        if (data == true) {
                            this.record[0].is_paid = false;
                            swal(
                                'Subscription',
                                'Your package has been expired.',
                                'success'
                            )
                        }
                        console.log(data)
                    }, error => {
                        console.log(error)
                    })
                }
                // console.log(newdate)
                console.log(this.datePipe.transform(date, "yyyy-MM-dd"), this.today, this.record[0].end_date)
            },
            error => {
                console.log(error)
            })
    }
    textonly='[a-zA-Z]+';
    usernameOnly = '[a-zA-Z0-9_.]+';

    ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'Profile | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.meta.updateTag({ property:'og:title', content: 'Profile | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.title.setTitle( 'Profile |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
        this.emailVerify = this.formBuilder.group({
            code: ['', Validators.required]
        });
        this.register = this.formBuilder.group({
            firstname: ['', [Validators.required,Validators.pattern('[a-zA-Z]+')]],
            lastname: ['', [Validators.required,Validators.pattern('[a-zA-Z]+')]],
            companyname: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9_.]+')]],
            address: ['',[Validators.required]],
            username: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9_.]+')]],
            zipcode: ['', [Validators.required, Validators.pattern('^[0-9,-]+$'), Validators.minLength(5)]],
            city: ['', [Validators.required]],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            // newsletter: ['', Validators.required],
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            email: [{ value: '', disabled: true }, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            // optionsCheckboxes: ['', Validators.required],
            // password: ['', Validators.required],
            // confirmPassword: ['', Validators.required],
        },
        );
        
        $('#click_advance').click(function () {
            $("i", this).toggleClass("fa-arrow-left fa-arrow-right");
        });
        console.log(JSON.parse(localStorage.getItem('currentUser')).username)
    }
   
    logout() {
        this.authService.signOut();
        localStorage.clear();
        swal({
            type: 'success',
            title: 'Successfully Logged out',
            showConfirmButton: false,
            timer: 1500,width: '512px',
        });
        this._nav.navigate(['/']);
    }
    ngOnDestroy() {
        // this.endRequest.unsubscribe();
    }
}