import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

@Component({
  selector: 'app-rfp-as-service',
  templateUrl: './rfp-as-service.component.html',
  styleUrls: ['./rfp-as-service.component.css']
})
export class RfpAsServiceComponent implements OnInit {

  constructor(private Title: Title, private meta: Meta,private metaService: MetaService) {
  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();}

  ngOnInit() { this.meta.updateTag({ name:'twitter:title', content:'RFP As Service | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'RFP As Service | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'RFP As Service |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
  }

}
