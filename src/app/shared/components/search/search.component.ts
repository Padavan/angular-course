import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.

  searchQuery = "";

  @Input() placeholder: string = "Input text";
  // Use the name `search` for the @Output.
  @Output() onSearchEvent = new EventEmitter();

  handleSearch() {
    this.onSearchEvent.emit(this.searchQuery);
  }
}
