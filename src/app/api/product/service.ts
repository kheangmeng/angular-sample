import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { generateFakeProduct, generateFakeOptionType, generateFakeOptionValue } from 'src/app/shared/faker/product';
import type { Pagination } from "../../types";
@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  constructor() {}

  getProducts(pagination: Pagination): Observable<any[]> {
    return new Observable((observer) => {
      const products = generateFakeProduct(pagination.limit);
      observer.next(products);
      observer.complete();
    });
  }

  getProductById(id?: number): Observable<any> {
      return new Observable((observer) => {
        const product = generateFakeProduct(1);
        observer.next(product);
        observer.complete();
      });
    }

  getOptionTypes(rows: number): Observable<any[]> {
    return new Observable((observer) => {
      const optionTypes = generateFakeOptionType(rows);
      observer.next(optionTypes);
      observer.complete();
    });
  }

  getOptionValues(rows: number): Observable<any[]> {
    return new Observable((observer) => {
      const optionValues = generateFakeOptionValue(rows);
      observer.next(optionValues);
      observer.complete();
    });
  }
}
