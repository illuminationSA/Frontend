import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  submitData(name, email, password){
    let body = { user: {name: name, email: email, password: password }}
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/users', body, options)
    .map((response: Response ) => {console.log(response.json());
    response.json();
    })
  }

}
