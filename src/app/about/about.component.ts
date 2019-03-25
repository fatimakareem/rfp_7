import { Component, OnInit } from '@angular/core';
import {NgxCarousel} from 'ngx-carousel';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  constructor(private Title: Title, private meta: Meta,private metaService: MetaService) {  this.metaService.createCanonicalURL(); this.metaService.metacreateCanonicalURL(); }
    public clientCarousel: NgxCarousel;
  ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'About Us | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.meta.updateTag({ property:'og:title', content: 'About Us | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
    this.Title.setTitle( 'About Us |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
      this.clientCarousel = {
          grid: {xs: 1, sm: 3, md: 4, lg: 5, all: 0},
          slide: 1,
          speed: 500,
          interval: 2000,
          point: {
              visible: false
          },
          load: 2,
          touch: true,
          loop: true,
          custom: 'banner',
          easing: 'ease'
      };
  }
    public myfunc(event: Event) {
        // carouselLoad will trigger this funnction when your load value reaches
        // it is helps to load the data by parts to increase the performance of the app
        // must use feature to all carousel
    }
}
