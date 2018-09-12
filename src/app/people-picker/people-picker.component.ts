import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';
//import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { AppService } from './../globaldata.service';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-people-picker',
  templateUrl: './people-picker.component.html',
  //styles: [`.form-control { width: 300px; }`],
  styleUrls: ['./people-picker.component.css']
})
export class PeoplePickerComponent implements OnInit {
  @Output() onUserSelected: EventEmitter<any> = new EventEmitter<any>();
  public model: any;
  public users: any;
  searching = false;
  searchFailed = false;
  public actorSelected = false;
  public noResults = false;

  constructor(private appService: AppService) {

  }

  ngOnInit() {
  
  }

  formatMatches = (value: any) => { 

    (typeof value === 'object') ? value=value.SearchDisplayName : value=value; return value
  
  };

  search = (text$: Observable<string>) => 
  text$.pipe(
    debounceTime(300),
    //distinctUntilChanged(),
    tap(() => {
      this.searching = true;
      this.noResults = false;
    }),
    switchMap(term => term ?
      this.appService.GetUserByNameSearch(term).map(response => {
        if(response.length === 0) { this.noResults = true; };
        return response;
      }) : Observable.of([])
    ),
    tap(() => this.searching = false)
  );

  OnFocus(e: Event): void {
    e.stopPropagation();
    setTimeout(() => {
      const inputEvent: Event = new Event('input');
      e.target.dispatchEvent(inputEvent);
    }, 0);
  }

  selectedItem(selectedItem){
    if (selectedItem) {
      this.actorSelected = true;
      this.onUserSelected.emit(selectedItem.item);
      console.log(selectedItem.item);
    } else {
      this.actorSelected = false;
    }
    console.log(selectedItem.item);
  }
}

