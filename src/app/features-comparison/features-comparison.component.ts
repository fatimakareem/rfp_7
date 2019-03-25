import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

@Component({
  selector: 'app-features-comparison',
  templateUrl: './features-comparison.component.html',
  styleUrls: ['./features-comparison.component.css']
})
export class FeaturesComparisonComponent implements OnInit {
  constructor(private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL(); }
  ngOnInit() { this.Title.setTitle( 'Features Comparison |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');this.meta.updateTag({ property:'og:title', content: 'Features Comparison | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
  this.meta.updateTag({ name:'twitter:title', content:'Features Comparison | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
  }

}
