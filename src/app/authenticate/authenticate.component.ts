import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from "@angular/http"
import { RegisterService } from "../registered/register.service";
import swal from 'sweetalert2';
@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit, OnDestroy {
  endRequest;
  sub;
  constructor(
    private _serv: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private http5: Http) { }
  ngOnInit() {
    this.endRequest = this.sub = this.route.params.subscribe(params => {
      this.authenticate(params['query1'])
    });
  }
  authenticate(uid) {
    this.endRequest = this._serv.authenticate_service(uid)
      .subscribe(
        data => {
          swal({
            type: 'success',
            title: 'Your Account is Verified',
            showConfirmButton: false,
            timer: 1500,width: '512px',
          })
          this.router.navigate(['/login']);
        },
        error => {
       
          this.router.navigate(['/login']);
        });
  }
  ngOnDestroy() {
  }
}
