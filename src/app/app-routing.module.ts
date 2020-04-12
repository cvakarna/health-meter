import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoDisplayComponent } from './info-display/info-display.component';
import { StateWiseComponent } from './info-display/state-wise/state-wise.component';
import { DistrictWiseComponent } from './info-display/district-wise/district-wise.component';
import { CountryWiseComponent } from './info-display/country-wise/country-wise.component';


const routes: Routes = [
  {
    path: 'covid19',
    component: InfoDisplayComponent
  },

  {
    path: 'covid19/india',
    // children: [
    //   {
    //     path: ':id/district-wise-info',
    //     component: DistrictWiseComponent
    //   }
    // ],
    component: StateWiseComponent
  },
  {
    path: 'covid19/india/:id/district-wise-info',
    component: DistrictWiseComponent
  },
  {
    path: 'covid19/country-wise-info',
    component: CountryWiseComponent
  },
  {

    path: '',
    pathMatch: "full",
    redirectTo: 'covid19/india'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
