import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map,startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-search.html',
  styleUrl: './input-search.css'
})
export class InputSearch {
  private httpClient = inject(HttpClient);
  protected searchInput = new FormControl('');
  protected searchResult$: Observable<any> = this.searchInput.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(keyword => this.fetchProducts(keyword || ''))
  );

  private fetchProducts(keyword: string) {
    const products = [
      'apple', 'banana', 'orange', 'grape', 'strawberry', 'pineapple', 'watermelon', 'kiwi', 'mango', 'peach',
      'pear', 'plum', 'cherry', 'blueberry', 'raspberry', 'lemon', 'lime', 'coconut', 'pomegranate', 'apricot'
    ];
    // const results = products.filter(product => product.toLowerCase().includes(keyword.toLowerCase()));
    // return new Promise((resolve) => {
    //   resolve(results);
    // });
    return this.httpClient.get('https://dummyjson.com/products/search', { params: { q: keyword } }).pipe(
      map((res: any) => res.products.map((product: any) => product.title))
    );
  }
}
