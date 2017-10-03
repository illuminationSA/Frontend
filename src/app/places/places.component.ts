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

  constructor(
    private placesService: PlacesService,
    private http: Http
  ) { }

  ngOnInit() {
  }

  getPlacesData( user_id ){
    this.placesService.getPlaces(user_id).subscribe(
    ( lawea => this.places = lawea ));
    // res => { console.log( res ) })
  }

}
