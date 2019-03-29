import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactUsService } from './contact-us.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

const NAME_REGEX = /^[a-zA-Z _.]+$/;
const normalPattern = /^[a-zA-Z0-9_.-]+?/;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [ContactUsService]
})
export class ContactUsComponent implements OnInit, OnDestroy {
  form;
  public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  emailonly = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  endRequest;
  constructor(private _serv: ContactUsService,private _nav: Router,private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL(); }
  ngOnInit() {this.meta.updateTag({ property:'og:title', content: 'Contact Us | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
  this.meta.updateTag({ name:'twitter:title', content:'Contact Us | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Contact Us |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    this.form = new FormGroup({
      name: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(NAME_REGEX),
      ])),
      email: new FormControl("", Validators.compose([
        Validators.required
        , Validators.pattern(this.emailonly),
      ])),
      phone: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      message: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(normalPattern),
      ])),
    });
  }
  onSubmit(name, email, phone, message) {
    console.log(name, email, phone, message);
    this.endRequest = this._serv.contact(name, email, phone, message).subscribe(data => {
      console.log(data);
      swal({
        type: 'success',
        title: 'Thank You For Contacting Us, We Will Reply Soon On Our E-mail',
        showConfirmButton: true,
        confirmButtonColor: "#090200",
        timer: 3000,width: '512px',
      });
      let url = '/';
      this._nav.navigate([url]);
    })
  }
  fun_send_message() {
  }
  ngOnDestroy() {
  }
}