import { UiSwitchModule } from 'ngx-ui-switch';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PlacesComponent } from './places/places.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterService } from './services/register.service';
import { ChartsModule } from 'ng2-charts';
import { ConsumptionComponent } from './consumption/consumption.component';
import { PlacesService } from './services/places.service';
import { LocalStorageModule } from 'angular-2-local-storage';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlacesComponent,
    HeaderComponent,
    ConsumptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiSwitchModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartsModule,
    LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        })
  ],
  providers: [
    RegisterService,
    PlacesService,
    HomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
