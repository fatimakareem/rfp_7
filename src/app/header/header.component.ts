import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import swal from 'sweetalert2';
import { SharedData } from '../shared-service';
import { AuthService } from "angular4-social-login";
import { SpeechRecognitionService } from './speechservice';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']})
export class HeaderComponent implements OnInit {
  public blink = false;
  @Output() spokenText = new EventEmitter<string>();
  @Output() error = new EventEmitter<string>();
  @Input() showInput = true;
 
  response(event) {
    this.query = event;
  }
  uname;
  local_admin:boolean=false;
  local;
  lacal_user:boolean=false;
  id;
  title;
  loaded = false;
  public query: any;
  public Rfp: any;
  public selected: any;
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
  constructor( private speech: SpeechRecognitionService,private authService: AuthService,private _nav: Router, public _shareData: SharedData,private _serv: HeaderService) { this.check_login1();this.check_adminlogin();
    this.check_login();}
  logout() {
    this.authService.signOut().then(success => {
    }, error => {
    });
    localStorage.clear();
    sessionStorage.clear();
    swal({
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
    this.notification();
    
  }
  notificate;
  unread;
  notification() {
    if(localStorage.getItem('currentUser')){
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
  
  }
  total;
  watchlist() {
    if(localStorage.getItem('currentUser')){
    this._serv.Watchlist().subscribe(
      data => {
        this.wrfp = data['result'];
        this.total = data.total
        this._shareData.watchInfo(this.wrfp);
        this._shareData.watchtotal(this.total);
      },
      error => {
      });
  }}
  get(id, title) {
    this.id = id;
    this.title = title
    swal({
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
          });
      }})
  }
 
  log:any;
  check_login() {
    // alert(localStorage.getItem('currentUser'))
    if(localStorage.getItem('loged_in')){  
      this.lacal_user=true;
      
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
    this._shareData.catInfo(this.query);
    let requiredUrl = 'searched-data'
    this._nav.navigate([requiredUrl], { queryParams: { keyword: this.query } });
    this.closeSearch();
  }
  filter(query) {
    if (this.query !== "") {
      this._serv.searchSuggestions(this.query).subscribe(response => {
        this.Rfp = response.results;
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
      this.uname = pars.username;
      this._shareData.subSubject.subscribe(message => {
        if (message == "Subscribe user" || message == "Trial Subscription user") {
        this.subscribe =message
        return false
      }});}
    else {
      return true
    }
  }
}
