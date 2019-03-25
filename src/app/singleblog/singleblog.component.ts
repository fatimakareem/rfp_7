import { Component, OnInit } from '@angular/core';
import { BlogService } from'./../blog/blog.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singleblog',
  templateUrl: './singleblog.component.html',
  styleUrls: ['./singleblog.component.css'],
  providers: [BlogService]
})
export class SingleblogComponent implements OnInit {
  blog:any=[];
  
  constructor(private _serv:BlogService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params  => {
    this._serv.singleblog(params.blogid).subscribe(
      data => {
        this.blog = data ;
console.log(this.blog)
      },error =>{
// console.log(error);
      });
    })

}

}
