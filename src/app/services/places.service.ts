import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class PlacesService {

  constructor( private http: Http ) { }

  submitData(place_name, place_id ){
    let body = { name: place_name };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put('http://localhost:3000/places/'+place_id, body, options)
      .map((response: Response) => { console.log(response.json());
    })
  }

  updateLights( light_name, light_id ){
    let body = { name: light_name };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put('http://localhost:3000/lights/'+light_id, body, options)
      .map((response: Response) => { console.log(response.json());
    })
  }

  newPlace( place_name, u_id ){
    let body = { name: place_name, user_id: u_id };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/places/', body, options)
    .map((response: Response) => {console.log(response.json());})
  }

  newLight( light_name, p_id ){
    let body = { name: light_name, place_id: p_id };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/lights/', body, options)
    .map((response: Response) => {console.log(response.json());})
  }

  newScheduleTime( sche_set_to, sche_event_time, l_id ){
    let body = { set_to: sche_set_to, event_time: sche_event_time, light_id: l_id };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/schedule_times/', body, options)
    .map((response: Response) => {console.log(response.json());})
  }

  deletePlace( place_id ){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete('http://localhost:3000/places/'+place_id, options)
    .map((response: Response) => {console.log(response.json());})
  }

  deleteLight( light_id ){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete('http://localhost:3000/lights/'+light_id, options)
    .map((response: Response) => {console.log(response.json());})
  }

  getPlaces( user_id ){
    return this.http.get('http://localhost:3000/users/'+user_id+'/places')
    .map((response: Response) => response.json());
  }

  getLights( place_id ){
    return this.http.get('http://localhost:3000/places/'+place_id+'/lights')
    .map((response: Response) => response.json());
  }

  getScheduleTimes( light_id ){
    return this.http.get('http://localhost:3000/lights/'+light_id+'/schedule_times')
    .map((response: Response) => response.json());
  }
}
