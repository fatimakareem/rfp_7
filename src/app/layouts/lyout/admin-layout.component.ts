import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import 'rxjs/add/operator/filter';
declare const $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit {
  private _router: Subscription;
  url: string;
  location: Location;
  constructor(private router: Router, location: Location) {
    this.location = location;
  }
  ngOnInit() {
  
  }
 w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }
}
