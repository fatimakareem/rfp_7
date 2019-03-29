import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { SharedData } from '../shared-service';
import swal from 'sweetalert2';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

@Component({
  selector: 'app-allnotification',
  templateUrl: './allnotification.component.html',
  styleUrls: ['./allnotification.component.scss'],
  providers: [HeaderService,SharedData]
})
export class AllnotificationComponent implements OnInit {
  id;
  title;
  constructor(private _nav: Router, public _shareData: SharedData, private _serv: HeaderService,private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();}

  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'All Notification | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'All Notification | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'All Notification |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    this.notification();
    this._shareData.notification.subscribe(message => this.notificate = message)
    this._shareData.unreadnotification.subscribe(message => this.unread = message)
  }
  get(id, title) {
    this.id = id;
    this.title = title
  }
  notificate;
  unread;
  total_notification;
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
  move() {
    localStorage.setItem('location', 'notifications')
  }
  single(query) {
   
    let requiredUrl = 'rfp'
    this._nav.navigate([requiredUrl], { queryParams: { query: query } });
  }
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
  deleteallnotification() {
    this._serv.deleteallnotify().subscribe(
      data => {
        swal({
          type: 'success',
          title: 'All Notifications Successfully Deleted.',
          showConfirmButton: false,
          timer: 2500,width: '512px',
        });
        this.notification()
      },
      error => {
      });
  }
}
