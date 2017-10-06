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
  schedules = [];
  num_schedules: number;
  currentPlace: number;
  currentUser: any;
  currentLight: number;
  count = 0;
  state: boolean;
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
    this.placesService.newPlace( place_name, this.currentUser ).subscribe(
      res => this.getPlacesData( this.currentUser ) )
  }

  createLight( light_name ){
    this.placesService.newLight( light_name, this.currentPlace ).subscribe(
      res => this.getLightsData( this.currentPlace ) )
  }

  getScheduleData( light_id ){
    this.placesService.getScheduleTimes(light_id).subscribe(
      ( sches => this.schedules = sches ));
    this.currentLight = light_id;
    console.log( "Current Light:" + this.currentLight );
  }

  createSchedules( date1, date2 ){
    this.placesService.newScheduleTime( true, date1, this.currentLight ).subscribe(
      res => this.getScheduleData( this.currentLight ) )
    this.placesService.newScheduleTime( false, date2, this.currentLight ).subscribe(
      res => this.getScheduleData( this.currentLight ) )
  }

  getLightLogs(id) {
    this.registerService
    .getLightLogs(id)
    .subscribe((reslightlogs => this.showLightLog(reslightlogs)))
  }

  // Funciona - Obtiene la lista de schedules times para un determinado id
  getScheduleTimes(light_id) {
    this.currentLight = light_id;
    this.registerService
    .getScheduleTimes(light_id)
    .subscribe((resSchedules => this.schedules = resSchedules))
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
    //console.log("hello" + this.consumption);
  }
}
