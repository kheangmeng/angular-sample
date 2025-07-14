import { Directive, forwardRef, input } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from "@angular/forms";
import { forbiddenNameValidator } from "./validator";

// Make sure forbiddenNameValidator and input are imported or defined above

@Directive({
  selector: '[appForbiddenName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ForbiddenValidatorDirective),
      multi: true
    }
  ]
})
export class ForbiddenValidatorDirective implements Validator {
  forbiddenName = input<string>('', {alias: 'appForbiddenName'});

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName
      ? forbiddenNameValidator(new RegExp(this.forbiddenName(), 'i'))(control)
      : null;
  }
}
