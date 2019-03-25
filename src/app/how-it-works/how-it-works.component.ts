import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
  constructor(private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL(); }
  ngOnInit() {this.Title.setTitle( 'How It Works |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');this.meta.updateTag({ property:'og:title', content: 'How It Works | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
  this.meta.updateTag({ name:'twitter:title', content:'How It Works | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
  }
}
