import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../../serv/main.service'
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from "angular4-social-login";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../../serv/meta_service';

// import { invoiceData } from './invoice-data';
declare const $: any;
@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
    providers: [AuthService, MainService]
})
export class HistoryComponent implements OnInit {
    
     captureScreen()  
    {  
      var data = document.getElementById('contentToConvert');  
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 208;   
        var pageHeight = 295;    
        // var imgHeight=200;
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
    
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('Invoice.pdf'); // Generated PDF   
      });  
    
    }  
    record = {};
    endRequest;
    nofound: boolean = false;
    pkgList = {};
    result: boolean = false;
    today: number = Date.now();
    pkg_detail = {};
    pkgsub = false;
    public mask = [/\d/, /\d/, /\d/, /\d/];
    public mask1 = [/[a-zA-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/];
    cardnumber1;
    cardnumber2;
    cardnumber3;
    cardnumber4;
    cardholdername;
    expmonth;
    options: FormGroup;
    expyear;
    ccv;
    local;
    uname;
    plan;
    flipclass = 'credit-card-box';
    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    constructor(private authService: AuthService, private _nav: Router, private datePipe: DatePipe, private formBuilder: FormBuilder, private _serv: MainService,private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();

        if (localStorage.getItem('currentUser')) {
            this.local = localStorage.getItem('currentUser');
            let pars = JSON.parse(this.local);
            this.uname = pars.username
        }
        this.options = formBuilder.group({
            bottom: 0,
            fixed: false,
            top: 0
        });
    }
   
    userdetail;
    valuee = '';
    firststep(value) {
        this.valuee = value;
        if (value == "BM") {
          this.prv_stepdetail("B", "M")
          this._nav.navigate(['pricing'], { queryParams: { value } });
        }
        else if (value == "PY") {
          this.prv_stepdetail("P", "Y")
          this._nav.navigate(['pricing'], { queryParams: {  value } });
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
      pay;
      end;
      get(pay_date,end_date){
this.pay=pay_date;
this.end=end_date
      }
    mainFunction() {
        this.endRequest = this._serv.purchaseHistory().subscribe(
            data => {
                this.record = data;
                this.pkgList = data.pkg_fk;
                this.result = true;
               
                var date = new Date();
this.userdetail=data.reg_fk;

              
                var currentDate = this.datePipe.transform(date, "yyyy-MM-dd").toString()

            },
            error => {
              
                if (error.status = 404) {
                    this.nofound = true;
                }
               
            })
    }
    next_stepdetail(event: any) {
      
        if (event.target.value == "BM") {
            this.prv_stepdetail("B", "M")

        } else if (event.target.value == "PY") {
            this.prv_stepdetail("P", "Y")
        }
    }
    prv_stepdetail(type, dur) {
        this.pkg_detail['type'] = type
        this.pkg_detail['dur'] = dur
        this.pkgsub = true;
    }
    proceed() {

        this.pkg_detail['credit'] = this.cardnumber1 + this.cardnumber2 +
            this.cardnumber3 + this.cardnumber4
        this.pkg_detail['ccv'] = this.ccv
        this.pkg_detail['expdate'] = this.expmonth + '/' + this.expyear
        this.endRequest = this._serv.packageUpdate(this.pkg_detail).subscribe(
            data => {
                swal(
                    'Your payment has been transferred',
                    '',
                    'success'
                )
                let url = 'find-rfp';
                this._nav.navigate([url]);
            },
            error => {
              
                swal(
                    'Oops...',
                    'Something went wrong!',
                    'error'
                )
            });
    }

    ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'Purchase History | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.meta.updateTag({ property:'og:title', content: 'Purchase History | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.Title.setTitle( 'Purchase History |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

        this.mainFunction()
        $('#click_advance').click(function () {
            $("i", this).toggleClass("fa-arrow-left fa-arrow-right");
        });
       
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
   
}