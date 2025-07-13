import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterBaseService {
  private count = new BehaviorSubject<number>(0);

  getCount(): number {
    return this.count.getValue();
  }

  increment() {
    this.count.next(this.count.getValue() + 1);
  }

  decrement() {
    this.count.next(this.count.getValue() - 1);
  }

}
