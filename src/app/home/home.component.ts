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

  sendData( name, email, email2, password, password2, signUpForm ){
    if ( name != '' && email != '' && password != '' && email === email2 && password === password2) {

        this.registerService
        .submitData( name, email, password )
        .subscribe(
          (res:any) => { console.log(res); location.reload(); ; alert("User created\nPlease login") },
          (err:any) => {
            console.log('myerror',err);
            alert(err._body); //JSON
          }
      )
    }
    else {
      alert("Be sure to have written your name\nCheck your Email and Password confirmations")
    }


  }

  sendLoginData( email, password ){
    this.registerService
    .postLogin( email, password )
    .subscribe(
      resLoginData => {
        this.saveToLocalStorage(resLoginData);
        location.href = "/places";
      },
      error => {
        console.log(error);
        alert("Email or password invalid!");
      }
    )
  }

  saveToLocalStorage(resLoginData){
    this.login = resLoginData;
    localStorage.setItem('currentUser', this.login.id);
    console.log(localStorage.getItem('currentUser'));
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
