import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [/*Add your code here*/]
})
export class EmailValidatorDirective implements Validator {
    // Add your code here
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return null;
    }
}
