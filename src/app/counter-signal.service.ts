import { Injectable, signal, computed } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CounterSignalService {
  private count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update(count => count + 1);
  }
  decrement() {
    this.count.update(count => count - 1);
  }

  getCount() {
    return this.count();
  }
}
