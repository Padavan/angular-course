import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  forkJoin,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import {
  debounceTime,
  switchMap,
  map,
  filter,
} from 'rxjs/operators';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  searchTermByCharacters = new Subject<string>();
  charactersResults$!: Observable<any>;
  planetAndCharactersResults$!: Observable<any>;
  isLoading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initLoadingState();
    this.initCharacterEvents();
  }

  changeCharactersInput(element: any): void {
    const inputValue: string = element.target.value;

    // 1.1. Add functionality to changeCharactersInput method. Changes searchTermByCharacters Subject value on input change.
    // YOUR CODE STARTS HERE
    this.searchTermByCharacters.next(inputValue);
    // YOUR CODE ENDS HERE
  }

  initCharacterEvents(): void {
    // 1.2. Add API call on each user input. Use mockDataService.getCharacters - to make get request.

    // 2. Since we don't want to spam our service add filter by input value and do not call API until a user enters at least 3 chars.

    // 3. Add debounce to prevent API calls until user stop typing.

    // YOUR CODE STARTS HERE
    this.charactersResults$ = this.searchTermByCharacters.pipe(
      debounceTime(1000),
      filter(v => v.length >= 3),
      switchMap((searchStr) => this.mockDataService.getCharacters(searchStr)),
    );
    // YOUR CODE ENDS HERE
  }

  loadCharactersAndPlanet(): void {
    console.log("loadCharactersAndPlanet");
    // 4. On clicking the button 'Load Characters And Planets', it is necessary to process two requests and combine the results of both requests into one result array. As a result, a list with the names of the characters and the names of the planets is displayed on the screen.
    // Your code should looks like this: this.planetAndCharactersResults$ = /* Your code */
    // YOUR CODE STARTS HERE

    // this.planetAndCharactersResults$.subscribe(s => console.log("planetAndCharactersResults$:", s));
    this.planetAndCharactersResults$ = forkJoin(
      this.mockDataService.getCharacters(),
      this.mockDataService.getPlatents()
    ).pipe(
      map(results => results.reduce((all, itm) => all.concat(itm), []))
    );
    // YOUR CODE ENDS HERE
  }

  initLoadingState(): void {
    /* 5.1. Let's add loader logic to our page. For each request, we have an observable that contains the state of the request.
            When we send a request the value is true, when the request is completed, the value becomes false.
            You can get value data with mockDataService.getCharactersLoader() and mockDataService.getPlanetLoader().

    - Combine the value of each of the streams.
    - Subscribe to changes
    - Check the received value using the areAllValuesTrue function and pass them to the isLoading variable. */
    // YOUR CODE STARTS HERE

    combineLatest(
      this.mockDataService.getCharactersLoader(),
      this.mockDataService.getPlanetLoader()
    ).subscribe(
      (arr) => {
        this.isLoading = this.areAllValuesTrue(arr);
      }
    );
    // YOUR CODE ENDS HERE
  }

  ngOnDestroy(): void {
    // 5.2 Unsubscribe from all subscriptions
    // YOUR CODE STARTS HERE
    // YOUR CODE ENDS HERE
  }

  areAllValuesTrue(elements: boolean[]): boolean {
    return elements.every((el) => el);
  }
}
