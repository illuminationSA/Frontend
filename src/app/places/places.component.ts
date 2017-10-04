import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { Http, Request, Headers, RequestOptions, RequestMethod } from '@angular/http';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  places = [];
  lights = [];

  constructor(
    private placesService: PlacesService,
    private http: Http
  ) { }

  ngOnInit() {
    this.getPlacesData( 1 );
  }

  getPlacesData( user_id ){
    this.placesService.getPlaces(user_id).subscribe(
    ( lawea => this.places = lawea ));
  }

  getLightsData( place_id ){
    this.placesService.getLights(place_id).subscribe(
      ( lgh => this.lights= lgh ));
  }

}
