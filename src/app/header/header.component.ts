import { Component, OnInit, AfterContentInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import swal from 'sweetalert2';
import { SharedData } from '../shared-service';
import { AuthService, SocialUser } from "angular4-social-login";
import { Meta } from '@angular/platform-browser';
import { SpeechRecognitionService } from './speechservice';
import { RfpService } from '../rfps/single-rfp/rfp.service';
import { Observable, Subject } from 'rxjs/Rx';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @ViewChild('openModal') openModal: ElementRef;
  public blink = false;
  @Output() spokenText = new EventEmitter<string>();
  @Output() error = new EventEmitter<string>();
  @Input() showInput = true;
  text;
  onError(event) {
    console.log(event, "error")
  }
  response(event) {
    console.log(event, 'text')
    this.query = event;
  }
  uname;
  local_admin:boolean=false;
  local;
  lacal_user:boolean=false;
  name;
  id;
  title;
  state: any = [];
  cat: any = [];
  loaded = false;
  public query: any;
  public Rfp: any;
  public selected: any;
  category;
  wrfp;
  mainSearch = 0;
  closeSearch() {
    if (this.mainSearch == 1) {
      this.mainSearch = 0;
      this.query = '';
      this.Rfp = '';
    }
  }
  focusInput(){
    if (this.mainSearch == 1) {
      let inputField: HTMLElement = <HTMLElement>document.querySelectorAll('.search-holder input')[0];
      inputField.focus();
    }
  }
  
  openSearch(): void {
    this.mainSearch = 1;
    this.focusInput();
  }
  constructor( private speech: SpeechRecognitionService,private authService: AuthService,private _nav: Router, public _shareData: SharedData,private _serv: HeaderService,private _serv1: RfpService) { this. check_login1();this.check_adminlogin();
    this.check_login();}
  logout() {
    this.authService.signOut().then(success => {
      console.log("true", success)
    }, error => {
      console.log("error", error)
    });
    localStorage.clear();
    sessionStorage.clear();
    swal.fire({
      type: 'success',
      title: 'Successfully Logged out',
      showConfirmButton: false,
      confirmButtonColor: "#090200",
      timer: 1500,width: '512px',
    });
    this._nav.navigate(['/']);
  }
  triggerMike() {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('please upgrade');
    } else {
      this.blink = true;
      this.search();
    }
  }
  search(): void {
    this.speech.record().subscribe((text) => {
      this.query = text;
      this.blink = false;
      this.spokenText.emit(this.query);
      this.speech.stop();
    },
    );
  }
  // single(query) {
  //   let sth = 'rfp/' + query;
  //   this._nav.navigate([sth]);
  // }
  deletenofication(id) {
    this._serv.deletenotify(id).subscribe(
      data => {
        this.notification();
      },
      error => {
      });
  }
  updatenofication(id) {
    this._serv.Updatenotify(id).subscribe(
      data => {
        this.notification();
      },
      error => {
      });
  }
  ngOnInit() {
    this.watchlist();
    this._shareData.notification.subscribe(message => this.notificate = message)
    this._shareData.unreadnotification.subscribe(message => this.unread = message)
    this._shareData.currentMessage.subscribe(message => this.wrfp = message)
    this._shareData.currentMessagetotal.subscribe(message => this.total = message)
    // this.watchlist();
    this.notification()

    // let timer = Observable.timer(0, 6000000);
    // timer.subscribe(() => this.notification());
    $('#search').click(function () {
      setTimeout(function () {
        $('#textsearch').focus();
      }, 350);
    });
    $("#box").click(function () {
      $("#box").toggleClass("animation-blink");
    });
  }
  notificate;
  unread;
  total_notification;
  notification() {
    this._serv.notify().subscribe(
      data => {
        this.notificate = data['notifications'];
        this.unread = data.unread;
        this._shareData.notifyInfo(this.notificate);
        this._shareData.unreadnotifyInfo(this.unread);
      },
      error => {
      });
  }
  total;
  watchlist() {
    this._serv.Watchlist().subscribe(
      data => {
        this.wrfp = data['result'];
        this.total = data.total
        this._shareData.watchInfo(this.wrfp);
        this._shareData.watchtotal(this.total);
      },
      error => {
      });
  }
  get(id, title) {
    this.id = id;
    this.title = title
    swal.fire({
      title: 'Are you sure you want to delete from watchlist? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // alert(result)
      if (result==true) {
        this._serv.deleteWatchlist(this.id).subscribe(
          data => {
            this.watchlist();
          },
          error => {
            // console.log(error);
          });
      }})
  }
 
  log:any;
  check_login() {
    // alert(localStorage.getItem('currentUser'))
    if(localStorage.getItem('loged_in')){  
      this.lacal_user=true;
        // this.log=JSON.parse(localStorage.getItem('currentUser'))
  
    // if ( this.log) {
    //   this.local = localStorage.getItem('currentUser');
    //   let pars = JSON.parse(this.local);
    //   this.uname = pars.username;
      return true;
    } else {
      this.lacal_user=false;
      return false;
    }
  }
  check_adminlogin() {
    if (localStorage.getItem('currentadmin')) {

      this.local_admin =true;
      return true;
    } else {
      this.local_admin =false;
      return false;
    }
  }
  fund(event) {
    console.log(this.query)
    this._shareData.catInfo(this.query);
    let requiredUrl = 'searched-data'
    this._nav.navigate([requiredUrl], { queryParams: { keyword: this.query } });
    this.closeSearch();
  }
  filter(query) {
    if (this.query !== "") {
      this._serv.searchSuggestions(this.query).subscribe(response => {
        this.Rfp = response.results;
        // console.log(this.Rfp);
        this.loaded = true;
      });
    }
  }
  select(item) {
    this.selected = item;
    this.mainSearch = 0;
    this.query = '';
    this.Rfp = '';
  }
  singlerfp(query) {
    // let sth = 'rfp/' + query;
    // this._nav.navigate([sth]);
    let requiredUrl = 'rfp'
    this._nav.navigate([requiredUrl], { queryParams: { query: query } });
    this.mainSearch = 0;
    this.query = '';
    this.Rfp = '';
  }
  subscribe;
  check_login1() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      this._serv1.usersubscribe(this.uname).subscribe(
        data => {
          //   console.log(data.Response);
          if (data.Response == "Subscribe user") {
            this.subscribe = data.Response
            return false
          }
        },
        error => {
          // console.log(error);
        });
    }
    else {
      return true
    }
  }
}
