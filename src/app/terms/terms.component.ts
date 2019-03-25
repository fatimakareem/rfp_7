import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(private Title: Title, private meta: Meta,private metaService: MetaService) {
  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL(); }

  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content: 'Terms | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'Terms | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Terms |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
  }

}
