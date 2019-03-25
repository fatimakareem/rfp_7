import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

declare var $: any;
@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css']
})
export class OurTeamComponent {
  constructor(private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();}
  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'Our Expert Team | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'Our Expert Team | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'Our Expert Team |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');

  }
}
