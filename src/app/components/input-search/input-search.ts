import { Component, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {A11yModule} from '@angular/cdk/a11y';
import { debounceTime, distinctUntilChanged, switchMap, map,startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [
    A11yModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './input-search.html',
  styleUrl: './input-search.css'
})
export class InputSearch {
  enter = output<string | null>();
  private httpClient = inject(HttpClient);
  protected searchInput = new FormControl('');
  protected searchResult$: Observable<any> = this.searchInput.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(keyword => this.fetchProducts(keyword || ''))
  );

  onEnter(event: Event) {
    event.preventDefault();
    this.enter.emit(this.searchInput.value);
  }
  onSearch(event: Event) {
    event.preventDefault();
    this.searchInput.setValue((event.target as HTMLInputElement).value || '');
  }

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
