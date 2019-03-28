import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Response, Http } from "@angular/http"
import { UnsubscribeService } from './unsubscribe.service';
import swal from 'sweetalert2';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss'],
 providers: [UnsubscribeService]
})
export class UnsubscribeComponent implements OnInit {
  sub;
  comment;
  constructor(private _serv: UnsubscribeService,
    private route: ActivatedRoute,
    private router: Router,
    private http5: Http,private Title: Title, private meta: Meta,private metaService: MetaService) {
    this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL(); }


  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content: 'Unsubscribe | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" }); this.meta.updateTag({ property:'og:title', content: 'Unsubscribe | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Unsubscribe |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

  }
  email: any = [];
  available;
  fun() {

   this.route.params.subscribe(params => {
     this._serv.qurey(params['query1'],this.comment)
     .subscribe(
      data => {
    this._serv.unsub(params['query1'])
      .subscribe(
      data => {
        swal({
          type: 'success',
          title: 'UnSubScribed Successfully',
          showConfirmButton: false,
          timer: 2000,width: '512px',
        })
        this.router.navigate(['/']);
        // if (this.email == "Alredy UnSubScribed") {
        //   swal({
        //     type: 'success',
        //     title: 'Alredy UnSubScribed',
        //     showConfirmButton: false,
        //     timer: 2000
        //   })
        //   this.router.navigate(['/']);
        // }
      })
      }
      );
    });
  }
  
}
