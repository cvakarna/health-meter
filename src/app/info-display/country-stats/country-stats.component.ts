import { Component, OnInit, Input } from '@angular/core';
import { IStateData } from 'src/app/models/IStateData';

@Component({
  selector: 'app-country-stats',
  templateUrl: './country-stats.component.html',
  styleUrls: ['./country-stats.component.scss']
})
export class CountryStatsComponent implements OnInit {

  @Input()
  countryStats: IStateData;

  constructor() {

  }

  ngOnInit() {
    console.log('country stats:', this.countryStats)
  }




}
