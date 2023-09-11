import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    // Add your code here
    // accept format 10/11/2020, return 10.11.2020
    transform(value: string): string {
        return value.replace("/", ".");
   }
}

