import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Http, Request, RequestMethod, Headers, RequestOptions } from '@angular/http';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Object;

  constructor(
    private registerService: RegisterService,
    private http: Http
  ) { }

  ngOnInit() {
  }

  sendData( name, email, password ){
    this.registerService.submitData( name, email, password ).subscribe(res => {console.log(res)})
  }

  sendLoginData( email, password ){
    this.registerService.postLogin( email, password ).subscribe(res => {console.log(res)})
  }

  sendUserData() {
    this.registerService.getUsers().subscribe(
     (resUserData => this.user = resUserData)
    );
  }

  //changeWindow(){
    //this.router.navigate({'./places'});
  //}

}
