import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { mapCustomers } from "./mapping";
import { generateFakeCountry, generateFakeCity } from "src/app/shared/faker/customer";
import type { Pagination, CustomerResponse } from "../../types";

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCustomers(pagination: Pagination): Observable<CustomerResponse[]> {
    return this.http
      .get<CustomerResponse>(
        `${this.apiUrl}/api/customers?page=${pagination.page}&limit=${pagination.limit}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .pipe(
        map(mapCustomers)
      )
    }

  getCountries(rows: number): Observable<any[]> {
    return new Observable((observer) => {
      const countries = generateFakeCountry(rows);
      observer.next(countries);
      observer.complete();
    });
  }

  getCities(rows: number): Observable<any[]> {
    return new Observable((observer) => {
      const cities = generateFakeCity(rows);
      observer.next(cities);
      observer.complete();
    });
  }
}
