import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {
    // Add your code here
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        const isValid = control.value?.includes("@");
        if (!isValid) return { emailValidation: { value: "Test" }};
        return null;
    }
}                   
