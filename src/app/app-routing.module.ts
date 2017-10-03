import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { NgModule } from '@angular/core';

///Componentes///
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlacesComponent } from './places/places.component';
import { ConsumptionComponent } from './consumption/consumption.component';

///SECURITY SERV
//import { LoggedInGuard } from './Services/authentication/logged-in-guard.service';

const routes: Routes = [
  { path: '',
    component: HomeComponent
  },
  { path: 'places',
    component: PlacesComponent
  },
  { path: 'consumption',
    component: ConsumptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const RoutingComponent = [
  PlacesComponent,
  HomeComponent,
  ConsumptionComponent
]
