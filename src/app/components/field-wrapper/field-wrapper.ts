import { Component, input } from "@angular/core";

@Component({
  selector: 'field-wrapper',
  templateUrl: './field-wrapper.html',
  styleUrl: './field-wrapper.css',
})
export class FieldWrapper {
  label = input<string>();
  required = input<boolean>(false);
}
