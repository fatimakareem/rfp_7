import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../Config";
import { Subscription } from 'rxjs/Subscription';
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { NgForm, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { Pipe, PipeTransform } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http, Response } from '@angular/http';
import { HomeService } from "../home/home.service";
import { ResponseContentType } from '@angular/http/src/enums';
import { Console } from '@angular/core/src/console';
// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { ActivatedRoute, Router } from '@angular/router';
// import { ValueUnwrapper } from '@angular/core/src/change_detection/change_detection_util';
//import { Http } from '@angular/http/src/http';
import { PageEvent } from '@angular/material';

import { Location } from '@angular/common';
declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/superdashboard',
        title: 'SuperDashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    // {
    //     path: '/components',
    //     title: 'Components',
    //     type: 'sub',
    //     icontype: 'apps',
    //     collapse: 'components',
    //     children: [
    //         {path: 'buttons', title: 'Buttons', ab:'B'},
    //         {path: 'grid', title: 'Grid System', ab:'GS'},
    //         {path: 'panels', title: 'Panels', ab:'P'},
    //         {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
    //         {path: 'notifications', title: 'Notifications', ab:'N'},
    //         {path: 'icons', title: 'Icons', ab:'I'},
    //         {path: 'typography', title: 'Typography', ab:'T'}
    //     ]
    // },
    // {
    //     path: '/forms',
    //     title: 'Forms',
    //     type: 'sub',
    //     icontype: 'content_paste',
    //     collapse: 'forms',
    //     children: [
    //         {path: 'regular', title: 'Regular Forms', ab:'RF'},
    //         {path: 'extended', title: 'Extended Forms', ab:'EF'},
    //         {path: 'validation', title: 'Validation Forms', ab:'VF'},
    //         {path: 'wizard', title: 'Wizard', ab:'W'}
    //     ]
    // },
    // {
    //     path: '/tables',
    //     title: 'Tables',
    //     type: 'sub',
    //     icontype: 'grid_on',
    //     collapse: 'tables',
    //     children: [
    //         {path: 'regular', title: 'Regular Tables', ab:'RT'},
    //         {path: 'extended', title: 'Extended Tables', ab:'ET'},
    //         {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
    //     ]
    // },
    // {
    //     path: '/maps',
    //     title: 'Maps',
    //     type: 'sub',
    //     icontype: 'place',
    //     collapse: 'maps',
    //     children: [
    //         {path: 'google', title: 'Google Maps', ab:'GM'},
    //         {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
    //         {path: 'vector', title: 'Vector Map', ab:'VM'}
    //     ]
    // },
    // {
    //     path: '/widgets',
    //     title: 'Widgets',
    //     type: 'link',
    //     icontype: 'widgets'

    // },
    // {
    //     path: '/charts',
    //     title: 'Charts',
    //     type: 'link',
    //     icontype: 'timeline'

    // },
    // {
    //     path: '/calendar',
    //     title: 'Calendar',
    //     type: 'link',
    //     icontype: 'date_range'
    // },
    // {
    //     path: '/pages',
    //     title: 'Pages',
    //     type: 'sub',
    //     icontype: 'image',
    //     collapse: 'pages',
    //     children: [
    //         {path: 'pricing', title: 'Pricing', ab:'P'},
    //         {path: 'timeline', title: 'Timeline Page', ab:'TP'},
    //         {path: 'login', title: 'Login Page', ab:'LP'},
    //         {path: 'register', title: 'Register Page', ab:'RP'},
    //         {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
    //         {path: 'user', title: 'User Page', ab:'UP'}
    //     ]
    // }
];

@Component({
  selector: 'app-supersiderbar',
  templateUrl: './supersiderbar.component.html',
  styleUrls: ['./supersiderbar.component.scss']
})
export class SupersiderbarComponent implements OnInit {
  public menuItems: any[];
  constructor(private _nav:Router,private route: ActivatedRoute) {

  }
 
  pageSizeOptions;
  private allItems: any[];
  pager: any = {};
  home: any = {};
  id: number;
  page: any[];

  // paged items
  pagedItems: any[];
  private sub: Subscription;
  private zip: any;
  prod_loaded = false;
  prods_loaded = false;
  localVar;
  public products: any;
  rating;
  closeResult: string;

  // setPage(username) {
  //     // alert("username")
  //     //  console.log("usernameeeeeeeeeeeee",username)

  //     const Results = {}

  //     this.companyService.searchProduct(username).subscribe(Response => {
  //         // console.log(Response.id);
  //         // this.id = Response.id;
  //         console.log('service');       // localStorage.setItem('products',response['Results']);
  //         this.sg['products'] = Response['Results'];
  //         console.log(this.sg['products']);
  //         for (let prod of this.sg['products']) {
  //             this.id = prod["id"];
  //             console.log(prod["id"])
  //             //console.log(prod["plan_information"])
  //             //console.log(prod["price_rate"])
  //             prod["plan_information"] = prod["plan_information"].split(',,', 3000);
  //             prod["price_rate"] = prod["price_rate"].split('..', 3000);

  //         }
  //         this.dataa.changeProducts(this.sg['products']);
  //         this.prod_loaded = true;
  //         this.prods_loaded = true;
  //         this.allItems = this.sg['products'];
  //         // console.clear()
  //         console.log(Response['Total Result']);
  //         //  this.pager = this.pagerService.getPager(Response['Total Result'], page, 10);
  //         //this.setPage(1);
  //         // initialize to page 1
  //         // console.log(this.sg['products']);

  //     });
  //     //   this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  // }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  public username;
  public user;
  private Sub: Subscription;
  ngOnInit() {
     
         
          //  alert("junaid");
          // this.data.currentProducts.subscribe(products => this.sg['products'] = products)
          // this.data.currentProducts
          this.user = localStorage.getItem('user')
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      
                  console.log(this.menuItems);
  }
  // updatePS(): void  {
  //     if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
  //         const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
  //         let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
  //     }
  // }
  // isMac(): boolean {
  //     let bool = false;
  //     if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
  //         bool = true;
  //     }
  //     return bool;
  // }
  logout(){
    localStorage.clear();
    this._nav.navigate(['/']);
  //  console.log("logout"); 
  }
}
