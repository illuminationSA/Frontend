import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class PlacesService {

  constructor( private http: Http ) { }

  submitData(place_name, place_id, user_id){
    let body = { name: place_name }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.patch('http://localhost:3000/places/'+place_id, body, options)
      .map((response: Response) => { console.log(response.json());
      response.json();
    })
  }

  getPlaces( user_id ){
    return this.http.get('http://localhost:3000/users/'+user_id+'/places')
    .map((response: Response) => response.json());
  }

  getLights( place_id ){
    return this.http.get('http://localhost:3000/places/'+place_id+'/lights')
    .map((response: Response) => response.json());
  }
}
