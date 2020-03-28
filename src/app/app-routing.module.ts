import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoDisplayComponent } from './info-display/info-display.component';


const routes: Routes = [

  {
    path: 'covid19',
    component: InfoDisplayComponent
  },
  {

    path: '',
    pathMatch: "full",
    redirectTo: 'covid19'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
