import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { partnershipservice } from './partnership.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.css'],
  providers: [partnershipservice]
})
export class PartnershipComponent implements OnInit {
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
}
resolved(captchaResponse: string) {
}
  displayFieldCss(form: FormGroup, field: string) {
    return {
        'has-error': this.isFieldValid(form, field),
        'has-feedback': this.isFieldValid(form, field)
    };
}
  formBuilder: any;
  var_Partner_description
  constructor(private _nav: Router, private pathnership_service: partnershipservice,private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL(); }
  var_get_data;
  partnership = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ]),
    cName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+')
    ]),
    Partner_description: new FormControl('', [
      Validators.required
    ])
    // des: new FormControl('',[
    //   Validators.required
    // ])
  });
  formclear() {
    this.partnership.controls.firstname = undefined;
    this.partnership.controls.email = undefined;
    this.partnership.controls.cName = undefined;
    this.partnership.controls.Partner_description = undefined;
  }
  onSubmit() {
    // this.var_Partner_description=this.Partner_description;
    this.var_get_data = this.pathnership_service.fun_insert_value(this.partnership.controls.firstname.value,
      this.partnership.controls.email.value,
      this.partnership.controls.cName.value, this.partnership.controls.Partner_description.value).subscribe(
        data => {
          console.log(data);
          swal({
            type: 'success',
            title: 'Thank You For Showing Your interest to Become a Partner',
            showConfirmButton: false,
            timer: 1500,width: '512px',
          });
          this._nav.navigate(['/']);
        })
  }
  get firstname() {
    return this.partnership.get('firstname');
  }
  get email() {
    return this.partnership.get('email');
  }
  get cName() {
    return this.partnership.get('cName');
  }
  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'Partnership | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'Partnership | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Partnership |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

  }
}