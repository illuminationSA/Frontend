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
  totalConsumption: string;
  graphData = [];
  datos = [];

  // graph stuff
  inidata:Array<any> =  new Array(288);

  public lineChartData:Array<any> = [
    {data: this.inidata, label: 'Series A'}
  ];

  public lineChartLabels:Array<string> = new Array(288);

  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(137,149,169,0.7)',
      borderWidth: 0.01,
      borderColor: 'rgba(148,159,177,1)',
      pointRadius: 0,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  constructor(
    private placesService: PlacesService,
    private localStorageService: LocalStorageService,
    private registerService: RegisterService,
    private http: Http
  ) { }

  ngOnInit() {
    var teim = new Date();
    teim.setHours(0,0,0,0);
    for( var i = 0; i < 288; i++ ){
      if( teim.getMinutes() == 0 && teim.getSeconds() == 0){
        console.log( String(teim.getMinutes) )
      }
      this.lineChartLabels[i] = String(teim.getHours()) + ":" + String(teim.getMinutes()) + ":" + String(teim.getSeconds());
      teim = new Date( teim.getTime() + 5*60000 );
    }
    // console.log
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
    document.getElementById('lights-column').style.visibility = "visible";
    this.placesService.getLights(place_id).subscribe(
      ( lgh => this.lights = lgh ));
    this.currentPlace = place_id;
    //console.log( "Current Place:" + this.currentPlace );
  }

  hideLightInfo( ){
    document.getElementById("light-info").style.visibility = "hidden";
  }

  showLightInfo( ){
    document.getElementById("light-info").style.visibility = "visible";
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
      res => this.deleteAndHidex2( res ) )
  }

  deleteAndHidex2(res){
    this.getPlacesData( this.currentUser );
    document.getElementById("lights-column").style.visibility = "hidden";
    document.getElementById("light-info").style.visibility = "hidden";
  }

  deleteLightCom( light_id ){
    this.placesService.deleteLight( light_id ).subscribe(
      res => this.deleteAndHide( res ) )
  }

  deleteAndHide(res){
    this.getLightsData(this.currentPlace);
    document.getElementById("light-info").style.visibility = "hidden";
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
      res => {
        this.getLightLogsData( this.currentLight );
      } )
  }

  delay( ms ){
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getLightLogs(id) {
    document.getElementById('light-info').style.visibility = "visible";
    this.currentLight = id;
    this.registerService
    .getLightLogs(id)
    //.subscribe((reslightlogs => this.showLightLog(reslightlogs)))
  }

  updateStatus( event ){
    console.log( "evento: " + event + " light_id " + this.currentLight );
    this.placesService.updateLightStatus( event, this.currentLight ).subscribe(
      res => this.getLightsData( this.currentPlace ) );
  }

  getGraphLightData(){
    this.placesService.getGraphData( this.currentLight ).subscribe(
      (res => { this.graphData = res;
        let dat = new Array<number>(288);
        var cap = new Array<any>(288);
        for(var punto = 0; punto < res.length; punto++){
          // dat.push( parseFloat(res[punto].data) );
          dat[punto] = res[punto].data;
          cap[punto] = res[punto].caption;
        }
        this.lineChartData = [{data: dat, label: 'Consumption'}];
        this.lineChartLabels = cap;
        console.log(this.lineChartData)
        console.log(this.lineChartLabels);
      } ) )
  }

  // graphThisOne(){
  //   var datos = [];
  //   for(var punto in this.graphData ){
  //     datos.push( punto.data );
  //   }
  //   console.log( datos );
  // }

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

  lightActionSwag( id ){
    document.getElementById('light-info').style.visibility = "visible";
    this.currentLight = id;
  }

  getTotalConsumption(){
    this.placesService.getTotalConsumption( this.currentUser )
    .subscribe( res => this.totalConsumption = res );
    console.log( this.totalConsumption );
  }
}
