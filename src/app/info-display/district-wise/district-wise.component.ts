import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { IStateData } from 'src/app/models/IStateData';

@Component({
  selector: 'app-district-wise',
  templateUrl: './district-wise.component.html',
  styleUrls: ['./district-wise.component.scss']
})
export class DistrictWiseComponent implements OnInit {

  statedistdata;
  objectKeys: string[];
  selectedState: string;
  stateStats: IStateData;


  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.initializeData()

  }


  initializeData() {


    this.dataService.$state_districtObservable.subscribe(state_distData => {
      console.log('StateDistrictData:', state_distData);
      let data = state_distData[this.selectedState];
      this.initializeData1(data);

    });



    this.route.params.subscribe(params => {
      console.log('params', params);
      this.selectedState = params['id'];
      let data = this.dataService.getDistrictDataByState(this.selectedState);
      this.initializeData1(data);
    });

  }

  initializeData1(data) {

    this.statedistdata = data['districtData'];
    console.log('get from service,', this.statedistdata);
    if (this.statedistdata) {
      this.objectKeys = Object.keys(this.statedistdata);

    }
    this.stateStats = this.dataService.getStateStatsData(this.selectedState);
    console.log('StateStats:', this.stateStats)

  }


}
