import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
declare const $: any;
@Component({
    selector: 'app-layout',
    templateUrl: './admin-layout.component.html'
})
export class AdminComponent implements OnInit, AfterViewInit {
    private _router: Subscription;
    url: string;
    location: Location;
    @ViewChild('sidebar') sidebar: any;
    constructor(private router: Router, location: Location) {
        this.location = location;
    }
    ngOnInit() {
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
        });
    }
    ngAfterViewInit() {
        this.runOnRouteChange();
    }
    public isMap() {
        if (this.location.prepareExternalUrl(this.location.path()) === '/maps/fullscreen') {
            return true;
        } else {
            return false;
        }
    }
    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    w3_open() {
        document.getElementById("mySidebar").style.display = "block";
      }
      w3_close() {
        document.getElementById("mySidebar").style.display = "none";
      }
}
