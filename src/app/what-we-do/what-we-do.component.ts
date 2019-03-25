import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

declare var $: any;

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.css']
})

export class WhatWeDoComponent {
  constructor(private Title: Title, private meta: Meta,private metaService: MetaService) {
  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();
}

  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content: 'What We Do? | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
  this.meta.updateTag({ property:'og:title', content: 'What We Do? | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });  this.Title.setTitle( 'What We Do? |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

  }
}
