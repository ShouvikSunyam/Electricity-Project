import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENVIRONMENT, Environment } from '../environment.token';

export interface CityResponse {
  cityName: string;
  coordinates: number[];
  postcode_localities: string[];
}

export interface StreetsResponse {
  zip: string;
  city: string;
  streets: string[];
}


@Injectable({ providedIn: 'root' })
export class AddressService {
  private apiUrl = 'http://localhost:8080';

  private baseUrl: string;
  constructor(
            @Inject(ENVIRONMENT) private env: Environment,
            private http: HttpClient,
          ) {
    this.baseUrl = env.apiBaseUrl;
  }

  getCitiesByZip(zip: string): Observable<{ city: string, city_id: number }[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/address/zipcode`, { params: { zip } }).pipe(
      map(response => {
        // EGON API returns list of cities with city and city_id
        return response.map(item => ({
          city: item.city,
          city_id: item.city_id
        }));
      })
    );
  }

  // Get streets by selected city_id
  getStreetsByCity(streetName: string, cityId: number): Observable<{ street: string, street_id: number }[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/address/streets`, { params: { streetName, cityId } }).pipe(
      map(response => {
        return response.map(item => ({
          street: item.street,
          street_id: item.street_id
        }));
      })
    );
  }

  // this is for open street api

  getCitiesByZipcode(zip: string): Observable<string[]> {
    const params = new HttpParams().set('zip', zip);

    return this.http
      .get<CityResponse[]>(`${this.baseUrl}/cities`, { params })
      .pipe(
        map(response => {
          if (!response || response.length === 0) {
            return [];
          }
          return response.map(city => city.cityName);
        })
      );
  }

  getStreetsByZip(zip: string): Observable<string[]> {
    const params = new HttpParams().set('zip', zip);
    return this.http
      .get<StreetsResponse>(`${this.baseUrl}/streets-by-zip`, { params })
      .pipe(
        map(response => {
          if (!response || !response.streets) {
            return [];
          }
          return response.streets;
        })
      );
  }

}
