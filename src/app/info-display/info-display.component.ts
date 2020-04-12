import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MessageServiceService } from '../message-service.service';
import { InfoMessage } from '../models/InfoMessage';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataService } from '../services/data.service';



@Component({
  selector: 'app-info-display',
  templateUrl: './info-display.component.html',
  styleUrls: ['./info-display.component.scss']
})
export class InfoDisplayComponent implements OnInit, OnDestroy {


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  messageInfo: InfoMessage;
  timerId;
  isTimerStarted: boolean = false;
  countriesList: InfoMessage[] = [];
  filteredCountriesList: InfoMessage[];
  dataSource: MatTableDataSource<InfoMessage>;
  items: InfoMessage[] = [];
  itemCount: number;
  displayedColumns = ['country', 'total', 'new', 'deaths', 'new deaths', 'recovered', 'active']


  constructor(private messageService: MessageServiceService, private cdr: ChangeDetectorRef, private dataService: DataService) {

    this.getDataFromServer();

  }

  ngOnInit() {


  }

  getDataFromServer() {

    this.dataByCountry('india');
    this.getAllCountriesStats();

  }

  dataByCountry(country: string) {
    this.messageService.getStatisticsByCountry(country).subscribe(res => {
      console.log(res);
      if (res['response'] != null) {
        let responseArray = res['response'] as Array<InfoMessage>;
        if (responseArray.length != 0) {
          this.messageInfo = responseArray[0];
          let localDate = new Date(this.messageInfo.time);
          this.messageInfo.time = localDate.toLocaleString();
          console.log(this.messageInfo);
          if (!this.isTimerStarted) {
            this.remainderToFetch(localDate);
          }
        }
      }
    });
  }
  getAllCountriesStats() {
    this.messageService.getAllCountriesStats().subscribe(res => {
      console.log('AllStats:', res);
      if (res['response'] != null) {
        let responseArray = res['response'] as Array<InfoMessage>;
        if (responseArray.length != 0) {
          responseArray = this.sortList(responseArray);
          this.countriesList = this.filteredCountriesList = responseArray;
          this.initializeDataTable(responseArray);
        }
      }
    })
  }

  private initializeDataTable(responseArray: Array<InfoMessage>) {

    this.dataSource = new MatTableDataSource(responseArray);
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.previewMatchSortingFn;

  }
  previewMatchSortingFn(item: InfoMessage, header: string): string | number {
    switch (header) {
      case "total":
        return item.cases.total;
      case "new":
        return item.cases.new;
      case "deaths":
        return item.deaths.total;
      case "new deaths":
        return item.deaths.new;
      case "recovered":
        return item.cases.recovered;
      case "active":
        return item.cases.active;
    }
  }

  reloadItems(params) {

    // if (!this.tableResource) return;
    // this.tableResource.query(params).then(items => this.items = items);

  }
  sortList(list: InfoMessage[]): Array<InfoMessage> {

    return list.sort((obj1, obj2) => {
      if (obj1.cases.total < obj2.cases.total) {
        return 1;
      }
      else if (obj1.cases.total > obj2.cases.total) {
        return -1;
      }
      else {
        return 0;
      }
    });

  }

  //fetch data every 10 min 
  remainderToFetch(date: Date) {

    this.timerId = setInterval(() => this.callTogetData(), 600000);
    console.log(this.timerId);
    this.isTimerStarted = true;
  }

  callTogetData() {
    //get country by data
    this.getDataFromServer();

  }
  filterData(query) {
    console.log(query);
    this.filteredCountriesList = query ? this.filteredCountriesList.filter(obj => obj.country.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : this.countriesList;
    this.dataSource.data = this.filteredCountriesList;
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }
}
