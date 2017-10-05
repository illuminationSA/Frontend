import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  submitData(name, email, password){
    let body = { user: {name: name, email: email, password: password }}
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
    .post('http://localhost:3000/users', body, options)
    .map((response: Response ) => {console.log(response.json())
    response.json();
    })
  }

  getUser(){
    return this.http.get('http://localhost:3000/users/1')
    .map((response:Response) => response.json());
  }

  getUsers(){
    return this.http.get('http://localhost:3000/users')
    .map((response:Response) => response.json())
  }

  getLightLogs(light_id){
    return this.http
    .get('http://localhost:3000/lights/'+light_id+'/light_logs')
    .map((response:Response) => response.json())
    .do(light => console.log(light));
  }

  postLogin(email, password){
    let body = {email: email, password: password }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/login.json', body, options)
    .map((response: Response ) => response.json());
  }

}
