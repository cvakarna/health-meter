import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InfoDisplayComponent } from './info-display/info-display.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StateWiseComponent } from './info-display/state-wise/state-wise.component';
import { DistrictWiseComponent } from './info-display/district-wise/district-wise.component';
import { CountryWiseComponent } from './info-display/country-wise/country-wise.component';
import { CountryStatsComponent } from './info-display/country-stats/country-stats.component';

import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './state-wise/dash-boards/pie-chart/pie-chart.component';
import { BarChartComponent } from './state-wise/dash-boards/bar-chart/bar-chart.component';
import { MessageInfoComponent } from './message-info/message-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoDisplayComponent,
    StateWiseComponent,
    DistrictWiseComponent,
    CountryWiseComponent,
    CountryStatsComponent,
    PieChartComponent,
    BarChartComponent,
    MessageInfoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
