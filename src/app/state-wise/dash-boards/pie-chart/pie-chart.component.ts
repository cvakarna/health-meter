import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { IStateData } from 'src/app/models/IStateData';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {


  @Input('state-wise-data')
  statewiseData: IStateData[];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'bar';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor() {



  }

  ngOnInit() {

    this.statewiseData.forEach(stateObj => {
      this.pieChartLabels.push(stateObj.state);
      this.pieChartData.push(+stateObj.confirmed);
    });
  }

}
