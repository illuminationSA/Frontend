import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { RegisterService } from '../services/register.service';
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
  lightlogs = [];
  currentUser: Object;
  count = 0;
  bool = false;

  constructor(
    private placesService: PlacesService,
    private localStorageService: LocalStorageService,
    private registerService: RegisterService,
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

  getLightLogs(id) {
    this.registerService
    .getLightLogs(id)
    .subscribe((reslightlogs => this.showLightLog(reslightlogs)))
  }
  showLightLog(reslightlogs){
    this.lightlogs = reslightlogs;
    console.log(this.lightlogs);
    var li;
    for(li in this.lightlogs){
        this.count++;
    }
    this.count--;
    console.log(this.count);
  }


}
