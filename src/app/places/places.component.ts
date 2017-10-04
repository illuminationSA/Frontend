import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  login: Object;

  constructor(private homeComponent: HomeComponent) { }

  ngOnInit() {
    this.login = this.homeComponent.getLogin();
    console.log(this.homeComponent.getLogin());
  }

}
