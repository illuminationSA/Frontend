import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class PlacesService {

  // url = 'http://192.168.0.30:3000'
  url = 'http://localhost:3000/'

  constructor( private http: Http ) { }

  submitData(place_name, place_id ){
    let body = { name: place_name };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    return this.http.put(this.url + 'places/' + place_id, body, options)
      .map((response: Response) => { console.log(response.json());
    })
  }

  updateLights( light_name, light_id ){
    let body = { name: light_name };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.url+'lights/'+light_id, body, options)
      .map((response: Response) => { console.log(response.json());
    })
  }

  newPlace( place_name, u_id ){
    let body = { name: place_name, user_id: u_id };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url+'places/', body, options)
    .map((response: Response) => {console.log(response.json());})
  }

  newLight( light_name, p_id ){
    let body = { name: light_name, place_id: p_id };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url+'lights/', body, options)
    .map((response: Response) => {console.log(response.json());})
  }

  newLightLog( log_event, l_id ){
    let body = { event: log_event, light_id: l_id };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url+'light_logs/', body, options)
    .map((response: Response) => {console.log(response.json());})
  }

  deletePlace( place_id ){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.url+'places/'+place_id, options)
    .map((response: Response) => {console.log(response.json());})
  }

  deleteLight( light_id ){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.url+'lights/'+light_id, options)
    .map((response: Response) => {console.log(response.json());})
  }

  getPlaces( user_id ){
    return this.http.get(this.url+'users/'+user_id+'/places')
    .map((response: Response) => response.json());
  }

  getLights( place_id ){
    return this.http.get(this.url+'places/'+place_id+'/lights')
    .map((response: Response) => response.json());
  }

  getLightLogs( light_id ){
    return this.http.get(this.url+'lights/'+light_id+'/light_logs')
    .map((response: Response) => response.json());
  }

  updateLightStatus( status, light_id ){
    console.log( "light status update" );
    let body = { status: status };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.url+'lights/'+light_id, body, options)
      .map( (response: Response) => { console.log(response.json() );
    })
  }

  getTotalConsumption( user_id ){
    return this.http.get(this.url+'users/'+ user_id +'/total_consumption')
    .map((response: Response) => response.json());
  }
  getLightConsumption( light_id ){
    return this.http.get(this.url+'lights/'+ light_id)
    .map((response: Response) => response.json());
  }

  getGraphData( light_id ){
    return this.http.get( this.url+'lights/'+light_id+'/data' )
    .map( (response: Response) => response.json() );
  }
}
