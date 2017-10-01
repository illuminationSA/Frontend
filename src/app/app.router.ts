import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const router: Routes = [
  { path: 'home', component: HomeComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
