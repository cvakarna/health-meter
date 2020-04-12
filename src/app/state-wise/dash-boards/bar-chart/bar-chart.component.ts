import { Component, OnInit, Input } from '@angular/core';
import { IStateData } from 'src/app/models/IStateData';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input('state-wise-data')
  statewiseData: IStateData[];

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[];
  constructor() {

  }

  ngOnInit() {

    let data = [];
    this.statewiseData.forEach(stateObj => {
      this.barChartLabels.push(stateObj.state);
      data.push(+stateObj.confirmed);
    });
    this.barChartData = [{ data: data, label: 'total' }]
  }

}


