import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { map, retry, timer } from "rxjs";

@Component({
  selector: 'user-list',
  template: `
    <h2>User List</h2>
    <button (click)="fetchData(10)">Fetch 10 products</button>
    <button (click)="fetchData(20)">Fetch 20 products</button>
    <button (click)="fetchData(30)">Fetch 30 products</button>
  `
})

export class UserListComponent {
  private httpClient = inject(HttpClient)
  constructor() {
    this.fetchData()
  }

  backoff(maxTries: number, initialDelay: number) {
    return retry({
        count: maxTries,
        delay: (error, retryCount) => timer(initialDelay * retryCount ** 2),
      });
  }
  fetchData(limit: number = 10) {
    const baseHeader = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer 123456');
    const baseParams = new HttpParams()
      .append('limit', limit)
      .append('skip', 0)
      .append('orderBy', '-id');
    console.log(baseHeader)
    console.log(baseParams)
    return this.httpClient.get('https://dummyjson.com/products/search', {
      headers: baseHeader,
      params: baseParams,
      cache: 'no-cache',
      priority: 'high',
      mode: 'cors',
    })
      .pipe(
        this.backoff(3, 1000),
        map((res: any) => res.products),
      )
      .subscribe(
        {
          next: user => {
            console.log(user)
          },
          error: err => {
            console.log(err)
          },
          complete: () => {
            console.log('complete')
          },
        }
      )
   }
}
