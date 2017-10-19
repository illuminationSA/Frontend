import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Http, Request, Headers, RequestOptions, RequestMethod } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private registerService: RegisterService,
    private http: Http
  ) {}

  deleteLogout(){
    this.registerService.deleteLogout()
    .subscribe(res => this.logoutProcess(res));
  }

  logoutProcess(res){
    console.log(res);
    location.href = "";
  }

  ngOnInit() {
  }

}
