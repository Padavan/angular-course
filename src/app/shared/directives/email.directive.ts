import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {  
    return (control: AbstractControl): { [key: string]: any } | null =>  {

        const isValid = control.value?.includes("@");
        return (!isValid)
            ? {
                emailValidation: "email not valid"
            }
            : null;
    }
}

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true
    }]
})
export class EmailValidatorDirective implements Validator {
    // Add your code here
    validate(control: AbstractControl<string, string>): ValidationErrors | null {
        return emailValidator()(control);
    }
}