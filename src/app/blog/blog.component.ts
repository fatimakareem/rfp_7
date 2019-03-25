import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [BlogService]
})
export class BlogComponent implements OnInit {
  blog: any = [];
  constructor(private _serv: BlogService, private _nav: Router, private http: Http) { }
  sendid(bid) {
    console.log(bid);
    let sth = 'single-blog';
    this._nav.navigate([sth], { queryParams: { blogid: bid } });
  }
  ngOnInit() {
    this._serv.blogRecord().subscribe(
      data => {
        this.blog = data;
        console.log(this.blog)
      }, error => {
      }
    )
  }

}