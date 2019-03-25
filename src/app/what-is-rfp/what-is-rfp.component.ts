import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

@Component({
  selector: 'app-what-is-rfp',
  templateUrl: './what-is-rfp.component.html',
  styleUrls: ['./what-is-rfp.component.css']
})
export class WhatIsRfpComponent implements OnInit {

  constructor(private Title: Title, private meta: Meta,private metaService: MetaService) {
  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL(); }

  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content: 'What is RFPGurus? | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" }); this.meta.updateTag({ property:'og:title', content: 'What is RFPGurus? | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" }); this.Title.setTitle( 'What is RFPGurus? |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

  }

}
