import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { LoginService } from './login.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ViewChild } from '@angular/core';
import { RecapchaComponent } from '../recapcha/recapcha.component';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
// import { JwtHelperService  } from '@auth0/angular-jwt';
import { JwtHelper } from 'angular2-jwt';
// import * as CryptoJS from 'crypto-js';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
import { Location } from '@angular/common';
import { RecapchaService } from '../recapcha/recapcha.service';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

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
    status?: boolean;
}
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService, AuthService]
})
export class LoginComponent implements OnInit, OnDestroy {
    @ViewChild(RecapchaComponent) captcha: RecapchaComponent;
    endRequest;
    hide = true;
    public typeValidation: User;
    register: FormGroup;
    login: FormGroup;
    type: FormGroup;
    isequal;
    jwtHelper: JwtHelper = new JwtHelper();
    private loggedIn: boolean;
    user: any;
    public logedin: any = 0;
    returnUrl: string;
    constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute, private _http: Http, private authService: AuthService, private _nav: Router, private _serv: LoginService, private formBuilder: FormBuilder, private _location: Location, public recapcha: RecapchaService, private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();}
    ///////////////////social login////////////////////////////
    socialCallBack = (user) => {
        this.user = user;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (user) {
            const createUser = this._http.post('https://apis.rfpgurus.com/social_login/', {
                user
            }, { headers: headers })
            createUser.subscribe(data => {
                console.log(data['token'], "data", data.json());
                let user = { userid: this.jwtHelper.decodeToken(data.json().token).user_id, username: this.jwtHelper.decodeToken(data.json().token).username, token: data.json().token };
                if (user && user.token) {
                    localStorage.setItem('loged_in', '1');
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                // console.log("junaid",this.jwtHelper.decodeToken(data.json().token))
                swal({
                    type: 'success',
                    title: 'Successfully Logged in',
                    showConfirmButton: false,
                    timer: 1500, width: '512px',
                });
                // this._location.back();
                if (localStorage.getItem('member')) {
                    let url = localStorage.getItem('member')
                    let last = url.length
                    let ur = url.slice(0, 13)
                    let state = url.slice(0, 5)
                    let category = url.slice(0, 8)
                    let agency = url.slice(0, 6)


                    if (ur == 'searched-data') { this._nav.navigate([ur], { queryParams: { keyword: url.slice(13, last) } }); }
                    else if (state == 'state') {
                        this._nav.navigate([state], { queryParams: { state: url.slice(5, last) } });
                    }
                    else if (category == 'category') {
                        this._nav.navigate([category], { queryParams: { cat: url.slice(8, last) } });
                    }
                    else if (agency == 'agency') {

                        this._nav.navigate([agency], { queryParams: { agency: url.slice(6, last) } });
                    }
                    else if (url == 'advanced-search') {
                        this._nav.navigate([url]);
                    }
                    else if (url == 'latest-rfp') {
                        this._nav.navigate([url]);
                    }
                    else {
                        var val = 'rfp/' + url
                        this._nav.navigate([val]);
                    }
                } else {
                    this._nav.navigate(['/']);
                }

            },
                error => {
                    swal(
                        'Invalid',
                        'Something went wrong',
                        'error'
                    )
                })
        }
    }
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(this.socialCallBack)
            .catch(message => console.log(message));
    }
    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(this.socialCallBack)
            .catch(message => console.log(message));
    }
    signOut(): void {
        this.authService.signOut();
    }
    /////////////////////end /////////////////////////////////
    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }
    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }
    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
    }
    onLogin() {
        // console.log(this.login);
        if (this.login.valid && this.recapcha.check()) {
            this.isequal = true;
            this._serv.login_authenticate(this.login.value.username).subscribe(
                data => {
                    //  console.log("user",data);
                    this._serv.login(this.login.value.username, this.login.value.password).subscribe(
                        data => {
                            swal({
                                type: 'success',
                                title: 'Successfully Logged in',
                                showConfirmButton: false,
                                timer: 1500, width: '512px',
                            });
                          
                            if (localStorage.getItem('member')) {
                                let url = localStorage.getItem('member')
                                let last = url.length
                                let ur = url.slice(0, 13)
                                let state = url.slice(0, 5)
                                let category = url.slice(0, 8)
                                let agency = url.slice(0, 6)


                                if (ur == 'searched-data') { this._nav.navigate([ur], { queryParams: { keyword: url.slice(13, last) } }); }
                                else if (state == 'state') {
                                    this._nav.navigate([state], { queryParams: { state: url.slice(5, last) } });
                                }
                                else if (category == 'category') {
                                    this._nav.navigate([category], { queryParams: { cat: url.slice(8, last) } });
                                }
                                else if (agency == 'agency') {

                                    this._nav.navigate([agency], { queryParams: { agency: url.slice(6, last) } });
                                }
                                else if (url == 'advanced-search') {
                                    this._nav.navigate([url]);
                                }
                                else if (url == 'latest-rfp') {
                                    this._nav.navigate([url]);
                                }
                                else {
                                    var val = 'rfp/' + url
                                    this._nav.navigate([val]);
                                }
                            } else {
                                this._nav.navigate(['/']);
                            }
                            // this._location.back();
                        },
                        error => {
                            swal(
                                'Invalid',
                                'Username OR Password',
                                'error'
                            )
                        });
                },
                error => {
                    console.log(error.status, 'masssssagaggggg')
                    if (error.status == 400) {
                        swal(
                            'Error',
                            'First, Verify your email address to Sign In.',
                            'error'
                        )
                    }
                    else if (error.status == 500) {
                        swal(
                            'Error',
                            'User doesnot exists',
                            'error'
                        )
                    }
                }
            );
        }
        else {
            this.validateAllFormFields(this.login);
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
    foremail() {
        swal({
            title: 'Enter email address',
            html: ' Enter your email address to receive a link allowing you to reset your password.',
            input: 'email',
            confirmButtonColor: "#000", width: '512px',
            inputPlaceholder: 'Enter your email address'
        }).then((email) => {
            this.forgetPassword(email)
        })
    }
    forgetPassword(pass) {
        this._serv.forget_password(pass).subscribe(
            data => {
                swal({
                    type: 'success',
                    html: 'Password reset instructions have been sent to your email. ',
                    width: '512px',
                })
            },
            error => {
                swal(
                    'Invalid email ',
                    'Or user does not exist!',
                    'error'
                )
            }
        )
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
    trik; encryptSecretKey;
    ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'Login | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.meta.updateTag({ property:'og:title', content: 'Login | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.Title.setTitle( 'Login |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

        if (isPlatformBrowser(this.platformId)) {
            this.logedin = localStorage.getItem('loged_in');
            // alert(this.logedin)
        }
        if (this.logedin == 1) {
            this._nav.navigate(['/']);
        }
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.login = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])]
        });
    }
    ngOnDestroy() {
        // this.endRequest.unsubscribe();
    }
}
