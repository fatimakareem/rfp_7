import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

declare var $:any;

@Component({
  selector: 'app-why-rfpgurus',
  templateUrl: './why-rfpgurus.component.html',
  styleUrls: ['./why-rfpgurus.component.css']
})

export class WhyRfpgurusComponent {
  constructor(private Title: Title, private meta: Meta,private metaService: MetaService) {
  this.metaService.createCanonicalURL();
  this.metaService.metacreateCanonicalURL();
}

  ngOnInit() {  this.meta.updateTag({ name:'twitter:title', content: 'Why RFPGurus? | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });

     this.meta.updateTag({ property:'og:title', content: 'Why RFPGurus? | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
  this.Title.setTitle( 'Why RFPGurus? |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

  }
}
