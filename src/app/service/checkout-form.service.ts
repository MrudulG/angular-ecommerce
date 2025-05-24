import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../common/country';
import { GetCountryResponse } from '../modals/GetCountryResponse';
import { State } from '../common/state';
import { GetStateResponse } from '../modals/GetStateResponse';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {

  countryUrl = "http://localhost:8080/api/countries";
  searchUrl = "http://localhost:8080/api/states/search/findByCountryCode?code="

  constructor(private httpClient: HttpClient) { }

  getCountryList(): Observable<Country[]>{
    return this.httpClient.get<GetCountryResponse>(this.countryUrl).pipe(
      map( res=> res._embedded.countries)
    )
  }

  getStateList(id: string): Observable<State[]>{
    return this.httpClient.get<GetStateResponse>(this.searchUrl+id).pipe(
      map(res=> res._embedded.states)
    )
  }

}
