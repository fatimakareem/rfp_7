import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.scss']
})
export class LogDetailComponent implements OnInit {
  log:any=[];
  constructor(private _serv: HeaderService) { }

  ngOnInit() {
    this._serv.logdetail().subscribe(
      data => {
        this.log=data;
      },
      error => {
      });
  }

}
