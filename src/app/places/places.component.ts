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
  currentPlace: number;
  currentUser: any;
  currentLight: number;
  count = 0;
  state: boolean;
  event_value: string = "off";
  consumption: string;

  constructor(
    private placesService: PlacesService,
    private localStorageService: LocalStorageService,
    private registerService: RegisterService,
    private http: Http
  ) { }

  ngOnInit() {
    //console.log(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = localStorage.getItem('currentUser');
    if(this.currentUser == null){
      location.href = "/";
    }
    //console.log(this.currentUser);
    this.getPlacesData( this.currentUser );
    //this.getLightLogs(this.currentUser);
  }

  getPlacesData( user_id ){
    this.placesService.getPlaces(user_id).subscribe(
    ( lawea => this.places = lawea ));
  }

  getLightsData( place_id ){
    this.placesService.getLights(place_id).subscribe(
      ( lgh => this.lights = lgh ));
    this.currentPlace = place_id;
    //console.log( "Current Place:" + this.currentPlace );
  }

  getLightLogsData( light_id ){
    this.placesService.getLightLogs(light_id).subscribe(
      ( llogs => {
        this.lightlogs = llogs;
        var testo = [];
        testo = llogs;
        var cnt = 0;
        for(let lilo in llogs){
          cnt++;
        }
        cnt--;
        if( cnt > 0 ){
          console.log( "light id: " + light_id + " last light log: " + llogs[cnt].event );
          this.state = llogs[cnt].event;
          return llogs[cnt].event;
        }
        else{
          console.log( "no hay weas lok" );
          this.state = false;
          return false;
        }
      } ) );
  }

  updatePlacesData( place_name, place_id ){
    this.placesService.submitData( place_name, place_id ).subscribe(
      res => this.getPlacesData( this.currentUser ) )
  }

  updateLightsData( light_name, light_id ){
    this.placesService.updateLights( light_name, light_id ).subscribe(
      res => this.getLightsData( this.currentPlace ) )
  }

  deletePlaceCom( place_id ){
    this.placesService.deletePlace( place_id ).subscribe(
      res => this.getPlacesData( this.currentUser ) )
  }

  deleteLightCom( light_id ){
    this.placesService.deleteLight( light_id ).subscribe(
      res => this.getLightsData( this.currentPlace ) )
  }

  createPlace( place_name ){
    if( place_name != '' && place_name.match(/^\S+$/) ){
      this.placesService
      .newPlace( place_name, this.currentUser )
      .subscribe(
        res => this.getPlacesData( this.currentUser ) )
    }
    else {
      alert("Be sure to have given the place a name\nRemember the name can't have spaces")
    }
  }

  createLight( light_name  ){
    if(light_name != '' && light_name.match(/^\S+$/)){
      this.placesService
      .newLight( light_name, this.currentPlace )
      .subscribe(
        res => this.getLightsData( this.currentPlace ) )
    }
    else {
      alert("Be sure to have given the light a name\nRemember the name can't have spaces")
    }
  }

  createLightLog( event ){
    this.placesService
    .newLightLog( event, this.currentLight )
    .subscribe(
      res => this.getLightLogsData( this.currentLight ) )
  }

  getLightLogs(id) {
    this.currentLight = id;
    this.registerService
    .getLightLogs(id)
    //.subscribe((reslightlogs => this.showLightLog(reslightlogs)))
  }

  getLightState(id){

  }

  showLightLog(reslightlogs){
    this.count = 0;
    this.lightlogs = reslightlogs;
    //console.log("lightlogs id: " + this.lightlogs[this.count].light_id);
    //console.log("lightlogs id: " + this.lights[this.lightlogs[this.count].light_id]);
    var li;
    for(li in this.lightlogs){
        this.count++;
    }
    this.count--;
    this.state = this.lightlogs[this.count].event;

    this.consumption = this.lights[this.lightlogs[this.count].light_id - 1].consumption;
    console.log("hello" + this.consumption);
  }
}
