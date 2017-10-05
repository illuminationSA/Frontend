import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Http, Request, RequestMethod, Headers, RequestOptions } from '@angular/http';
import { AppRoutingModule } from '../app-routing.module';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Object;
  public login: any;
  errorMessage: any;

  constructor(
    private registerService: RegisterService,
    private localStorageService: LocalStorageService,
    private http: Http
  ) { }

  ngOnInit() {
    localStorage.clear();
  }

  //IMPORTANTE!!
  //guardar en local storage
  //localStorage.setItem(itemName, JSON.stringify(itemData));
  //localStorage.setItem('currentUser', JSON.stringify({ token: token, name: name }));
  //obtener del local storage
  //user = JSON.parse(localStorage.getItem(currentUser));

  bruh( token ){
    console.log(token);
  }



  //getFromLocalStorage()

  getLogin(){
    return this.login;
  }

  sendData( name, email, password ){
    this.registerService
    .submitData( name, email, password )
    .subscribe(res => {console.log(res)})
  }

  sendLoginData( email, password ){
    this.registerService
    .postLogin( email, password )
    .subscribe(
      resLoginData => this.saveToLocalStorage(resLoginData),
      error => this.errorHandling(error)
    )
  }

  errorHandling(error){
    this.errorMessage = error;
    console.log(this.errorMessage)
  }

  saveToLocalStorage(resLoginData){
    this.login = resLoginData;
    localStorage.setItem('currentUser', this.login.id);
    console.log("local storage: " + localStorage.getItem('currentUser'));
    console.log(this.login);

  }

  sendUserData() {
    this.registerService
    .getUser()
    .subscribe(
     (resUserData => this.user = resUserData)
    );
  }

  //changeWindow(){
    //this.router.navigate({'./places'});
  //}

}
