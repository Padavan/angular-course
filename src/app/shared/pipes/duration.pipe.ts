import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    // Add your code here
    transform(value: number): string {
        const hours = Math.floor(value / 60);
        const minutes = Math.floor(value % 60);

        const label = (hours > 1) ? "hours" : "hour";

        return hours.toString().padStart(1, "0") + ":" + minutes.toString().padStart(2, "0") + " " + label;

   }
}


