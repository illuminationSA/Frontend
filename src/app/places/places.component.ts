import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { Http, Request, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HomeComponent } from '../home/home.component';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  places = [];
  lights = [];
  currentUser: Object;

  constructor(
    private placesService: PlacesService,
    private localStorageService: LocalStorageService,
    private http: Http
  ) { }
  ngOnInit() {
    //console.log(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = localStorage.getItem('currentUser');
    console.log("hey");
    console.log(this.currentUser);
    this.getPlacesData( this.currentUser );
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
