import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { mapCustomers } from "./mapping";
import { generateFakeCustomer, generateFakeCountry, generateFakeCity } from "src/app/shared/faker/customer";
import type { Pagination, CustomerResponse } from "../../types";

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCustomers(pagination: Pagination): Observable<any[]> {
    return new Observable((observer) => {
      const customers = generateFakeCustomer(pagination.limit);
      observer.next(customers);
      observer.complete();
    });
    // return this.http
    //   .get<CustomerResponse>(
    //     `${this.apiUrl}/api/customers?page=${pagination.page}&limit=${pagination.limit}`, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${localStorage.getItem('token')}`,
    //       },
    //     }
    //   )
    //   .pipe(
    //     map(mapCustomers)
    //   )
}

  getCustomerById(id?: number): Observable<any> {
    return new Observable((observer) => {
      const customer = generateFakeCustomer(1);
      observer.next(customer);
      observer.complete();
    });
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
