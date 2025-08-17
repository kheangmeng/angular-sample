import { Component } from "@angular/core";
import { BService } from "./b-service";
import { HighlightDirective } from "./b-directive";
import { BComponent } from "./b-component";

@Component({
  selector: 'b-list-page',
  template: `
    <div>
      <h1 bHighlight>B list Page</h1>
      {{ getBService() }}
      <b-component></b-component>
    </div>
  `,
  imports: [HighlightDirective, BComponent],
  providers: [BService]
})

export class BListComponent extends BService {}
