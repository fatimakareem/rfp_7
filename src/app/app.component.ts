import { Component, OnInit, Inject,ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/platform-browser';
// import { networkInterfaces } from 'os';
declare var $: any;

@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    // siteKey = '6Lebrk8UAAAAAFt6cq9isv1EzTIXN6wgrC8Drbwy';
    // secretKey = '6Lebrk8UAAAAAJDD-gFnna3WtX6-ZKFtDC1dE1Te';
    
    private _router: Subscription;
    time;
    constructor( private _nav: Router, private router: Router, @Inject(DOCUMENT,) private document: any) {}
   
    ngOnInit() {   
        $.material.options.autofill = true;
        $.material.init();
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            }else{
                window.document.activeElement.scrollTop = 0;
            }
        });
       
        window.onbeforeunload = function () {
            $(this).scrollTop(0);
            localStorage.removeItem('status')
            localStorage.removeItem('enterdate')
              localStorage.removeItem('duedate')
                 localStorage.removeItem('states');
                 localStorage.removeItem('submission_to')
                 localStorage.removeItem('submission_from')
                 localStorage.removeItem('submissionto')
                 localStorage.removeItem('submissionfrom')
            localStorage.removeItem('agencies')
             localStorage.removeItem('cates')
            localStorage.removeItem('page')
            localStorage.removeItem('pages')
    localStorage.removeItem('enterdates');
    localStorage.removeItem('duedates');
    localStorage.removeItem('statess');
    localStorage.removeItem('agenciess');
    localStorage.removeItem('catess');
    localStorage.removeItem('subcats');
    localStorage.removeItem('adminpage');
    localStorage.removeItem('latestpage');
    localStorage.removeItem('statepage')
    localStorage.removeItem('catpage')
    localStorage.removeItem('resultspage')
    localStorage.removeItem('subcatpage')



          }
      

    }
}