import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AllAgenciesService } from './all-agencies.service';
import { SharedData } from '../../shared-service'; import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../../serv/meta_service';

@Component({
    selector: 'app-agencies',
    templateUrl: './all-agencies.component.html',
    styleUrls: ['./all-agencies.component.css'],
    providers: [AllAgenciesService, SharedData]
})
export class AllAgenciesComponent implements OnInit, OnDestroy {
    back() {
        this._location.back();
    }
    endRequest;
    agency: any = [];
    agensearch;
    loaded = false;
    public query: any;
    public Rfp: any;
    public selected: any;
    constructor(public _shareData: SharedData, private _nav: Router, private _serv: AllAgenciesService, private _location: Location, private Title: Title, private meta: Meta, private metaService: MetaService) {
        this.metaService.createCanonicalURL(); this.metaService.metacreateCanonicalURL();
        this.endRequest = this._serv.rfpagency().subscribe(
            data => {
                this.agency = data.Result;
                this.loaded = true;
            },
            error => {
            }
        )
    }
    singleagency(agency) {
        this.endRequest = this._shareData.agencyInfo(agency);
        let sth = 'agency';
        this._nav.navigate([sth], { queryParams: { agency: agency, } });
    }
    ngOnInit() {
        this.meta.updateTag({ name: 'twitter:title', content: 'All Agencies | ' + "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.meta.updateTag({ property: 'og:title', content: 'All Agencies | ' + "RFP Gurus | Find RFP Bid Sites | Government Request for Proposal" });
        this.Title.setTitle('All Agencies |' + ' RFP Gurus | Find RFP Bid Sites | Government Request for Proposal');
    }
    mainSearch = 0;
    closeSearch() {
        if (this.mainSearch == 1) {
            this.mainSearch = 0;
            this.query = '';
            this.Rfp = '';
        }
    }
    focusInput() {
        if (this.mainSearch == 1) {
            let inputField: HTMLElement = <HTMLElement>document.querySelectorAll('.search-holder input')[0];
            inputField.focus();
        }
    }
    // openSearch(): void {
    //     this.mainSearch = 1;
    //     setTimeout(this.focusInput(), 5000);
    // }
    item;
    filter(val) {
        if (this.query !== "") {
            this.endRequest = this._serv.searchrecord(val).subscribe(response => {
                this.Rfp = response.results;
                 this.item = response.totalItems

                this.loaded = true;
            });
        }
    }
    select(item) {
        this.selected = item;
        this.mainSearch = 0;
        this.query = '';
        this.Rfp = '';
    }
    singlerfp(id, num) {
        let sth = 'single-rfp';
        this._nav.navigate([sth], { queryParams: { id: id, rfp: num } });
    }
    ngOnDestroy() {
    }
}
