import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { Http, Request, Headers, RequestOptions, RequestMethod } from '@angular/http';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  constructor(
    private placesService: PlacesService,
    private http: Http
  ) { }

  ngOnInit() {
  }

  sendData( user_id ){
    this.placesService.submitData(user_id).subscribe(
      res => { console.log( res ) })
  }

}
