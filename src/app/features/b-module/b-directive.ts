import {Directive, ElementRef, inject} from '@angular/core';
@Directive({
  selector: '[bHighlight]',
})
export class HighlightDirective {
  private el = inject(ElementRef);
  constructor() {
    this.el.nativeElement.style.backgroundColor = 'blue';
  }
}
