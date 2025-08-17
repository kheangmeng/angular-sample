import { Component } from "@angular/core";
import { AService } from "./a-service";
import { HighlightDirective } from "./a-directive";
import { AComponent } from "./a-component";
import { BComponent } from "../b-module/b-component";
// import { BService } from "../b-module/b-service";
// import { HighlightDirective } from "../b-module/b-directive";

@Component({
  selector: 'a-list-page',
  template: `
    <div>
      <h1 aHighlight>A list Page</h1>
      {{ getAService() }}
      <a-component></a-component>
      <b-component></b-component>
    </div>
  `,
  imports: [HighlightDirective, AComponent, BComponent],
  providers: [AService]
})

export class AListComponent extends AService {}
