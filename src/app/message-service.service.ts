import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  private baseUrl: string = "https://covid-193.p.rapidapi.com/";
  private headers = new HttpHeaders({
    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
    'x-rapidapi-key': '73dc51cbcbmsha08a33bc527b082p1c5480jsnaf4252a64194'
  });


  constructor(private http: HttpClient) {

  }

  getStatisticsByCountry(country: string): Observable<any> {

    return this.http.get(this.baseUrl + 'statistics?country=' + country, { headers: this.headers });

  }
  getAllCountriesStats(): Observable<any> {
    return this.http.get(this.baseUrl + 'statistics', { headers: this.headers });
  }
}
