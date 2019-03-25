import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { Router} from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import {PagerService} from './paginator.service';

@Component({
  selector: 'app-rfp',
  templateUrl: './rfp.component.html',
  styleUrls: ['./rfp.component.css']
})

export class RfpComponent implements OnInit {
  type = 'title';
  record = {};
    startIndex;
    pageSizeOptions;

  displayedColumns = ['rfp_number', 'title', 'category', 'state', 'date_entered', 'due_date'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource: ExampleDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginatorone: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
    currentUser;

  constructor(private _nav: Router, private http: Http,private pagerService: PagerService ) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

    onPaginateChange(event) {
        this.startIndex = event.pageIndex * event.pageSize;

    }


    setPage(page: number) {}
  status: boolean = false;
  navbarClass() {
    this.status = !this.status;
  }
  singlerfp(query) {
    let sth = 'rfp/'+query;
    this._nav.navigate([sth]);
  }
  staterfp(state) {
    let sth = 'state';
    this._nav.navigate([sth], { queryParams: { state: state } });
  }
  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);
    console.log('Paginator iss', this.paginator)
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase!, this.paginator, this.sort);

  }
  applyFilter(filterValue: string) {
    console.log(filterValue)
      console.log('Paginator iss', this.paginator)
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase!, this.paginator, this.sort)

  }
}
export interface GithubApi {
  results: GithubIssue[];
  totalItems: number;
  totalPages: number,
}

export interface GithubIssue {
  rfp_number: string;
  due_date: string;
  date_entered: string;
  category: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
currentUser;
  constructor(private http: Http) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  getRepoIssues(pageSize: number, sort: string, order: string, page: number): Observable<GithubApi> {
      let headers = new Headers();
      if (this.currentUser) {
          headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
      }
      headers.append('Content-Type', 'application/json');
      const href = 'https://apis.rfpgurus.com/rf_p/rfp/';
      const requestUrl =
      `${href}${sort}/${order}/${pageSize}?page=${page + 1}`;

    return this.http.get(requestUrl,{ headers: headers }).map(response => response.json() as GithubApi);
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleHttpDao. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<GithubIssue> {
  // The number of issues returned by github matching the query.
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  constructor(private exampleDatabase: ExampleHttpDao,
    private paginator: MatPaginator,
    private sort: MatSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<GithubIssue[]> {
    const displayDataChanges = [
      this.sort.sortChange,
      this.paginator.page,
    ];

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.exampleDatabase.getRepoIssues(
          this.paginator.pageSize, this.sort.active, this.sort.direction, this.paginator.pageIndex);
      })
      .map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.totalItems;
        return data.results;
      })
      .catch(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return Observable.of([]);
      });
  }
  disconnect() { }
}