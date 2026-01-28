import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { generateFakeProduct, generateFakeOptionType, generateFakeOptionValue } from 'src/app/shared/faker/product';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  constructor() {}

  getProducts(rows: number): Observable<any[]> {
    return new Observable((observer) => {
      const products = generateFakeProduct(rows);
      observer.next(products);
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
