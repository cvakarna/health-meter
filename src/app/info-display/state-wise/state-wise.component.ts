import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IStateData } from 'src/app/models/IStateData';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-state-wise',
  templateUrl: './state-wise.component.html',
  styleUrls: ['./state-wise.component.scss']
})
export class StateWiseComponent implements OnInit, OnDestroy {

  private statesData: IStateData[];
  private filteredStatesData: IStateData[];
  private countryData: IStateData;
  private state_distData: any;
  private selected_state_dist: any;
  displayedColumns = ['state', 'total', 'active', 'deaths', 'recovered', 'new']



  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.initializeData();
  }

  initializeData() {

    this.dataService.$stateDataObservable.subscribe(statesData => {
      this.initializeData1(statesData);
    });


    let data = this.dataService.getStatesData();
    this.initializeData1(data);
  }


  initializeData1(data: IStateData[]) {

    if (data) {
      this.countryData = data.find(data =>
        data.state === "Total",
      );
      this.statesData = data.filter(obj => obj.state != this.countryData.state);
      this.filteredStatesData = this.statesData;
    }

  }

  onSelect(data) {
    console.log('selectedData:', data);
    this.router.navigate(['./' + data.state + '/district-wise-info'], { relativeTo: this.route })
  }

  filterData(query) {
    console.log(query);
    this.filteredStatesData = query ? this.filteredStatesData.filter(obj => obj.state.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : this.statesData;
  }
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  ngOnDestroy() {

  }

}
