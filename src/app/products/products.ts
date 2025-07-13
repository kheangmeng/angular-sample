import { Component, Inject } from '@angular/core';
import { ADMIN_KEY } from '../app.routes';
import { CounterSignalService } from '../counter-signal.service'
import { CounterBaseService } from '../counter-base.service'

@Component({
  selector: 'app-products',
  imports: [],
  exportAs: 'products',
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  constructor(
    @Inject(ADMIN_KEY) private adminKey: string,
    public counter: CounterSignalService,
    public counterBase: CounterBaseService
  ) {
    console.log(this.adminKey);
  }
}
