import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../serv/meta_service';

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'dialog-overview-example',
    templateUrl: 'residential.component.html',
    styleUrls: ['./residential.component.css']
})

export class DialogOverviewExample {
    ngOnInit() {this.meta.updateTag({ name:'twitter:title', content:'FAQ | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.meta.updateTag({ property:'og:title', content: 'FAQ | '+ "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.Title.setTitle( 'FAQ |' +' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    }    
    animal: string;
    name: string;

    constructor(public dialog: MatDialog,private Title: Title, private meta: Meta,private metaService: MetaService) {
    this.metaService.createCanonicalURL();this.metaService.metacreateCanonicalURL();
    }
}


