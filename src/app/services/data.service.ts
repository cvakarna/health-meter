import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IStateData } from '../models/IStateData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl: string = 'https://api.covid19india.org/';

  private stateData: IStateData[];
  private state_districtData;

  $stateDataObservable: Subject<IStateData[]> = new Subject<IStateData[]>();
  $state_districtObservable: Subject<any> = new Subject<any>();
  $districtDataObservable: Subject<any> = new Subject<any>();



  constructor(private _http: HttpClient) {
    this.getData_Api();
    this.getState_DistrictData_Api();
  }

  private getData_Api() {
    this._http.get(this.apiUrl + 'data.json').subscribe(resp => {
      console.log(resp);
      this.stateData = resp['statewise'] as IStateData[];
      this.$stateDataObservable.next(this.stateData);
    });

  }

  getState_DistrictData_Api() {
    return this._http.get(this.apiUrl + 'state_district_wise.json').subscribe(response => {
      console.log(response);
      this.state_districtData = response;
      this.$state_districtObservable.next(this.state_districtData);
    })
  }

  getStatesData(): IStateData[] {
    if (this.stateData) {
      let stateData = [...this.stateData];
      return stateData;
    }
    return null;

  }

  getStateDistrictData(state: string) {

    let state_dist = { ...this.state_districtData };
    return state_dist[state];

  }
  getDistrictDataByState(state: string) {

    if (this.state_districtData) {
      let state_dist = { ...this.state_districtData };
      return state_dist[state];
    } else {
      return {};
    }
  }

  getStateStatsData(state: string): IStateData {

    if (this.stateData) {
      return this.stateData.find(obj => {
        if (obj.state == state) {
          return obj;
        }
      });

    }
    return null;

  }

}
