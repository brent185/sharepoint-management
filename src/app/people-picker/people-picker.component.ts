import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompleterService, CompleterData, RemoteData, CompleterItem } from 'ng2-completer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
//import { EventEmitter } from 'events';

@Component({
  selector: 'app-people-picker',
  templateUrl: './people-picker.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./people-picker.component.css']
})
export class PeoplePickerComponent {
  @Output() onUserSelected: EventEmitter<any> = new EventEmitter<any>();

  public actor: string;

  public actorSelected = false;

  public actorDS: RemoteData;

  constructor(private http: HttpClient, completerService: CompleterService) {
    this.actorDS = completerService.remote(null, 'name', 'name');
    this.actorDS.urlFormater(term => {
            return `https://api.themoviedb.org/3/search/person?api_key=36bf560f8967672b5e428038340f0065&language=en-US&query=${term}&page=1&include_adult=false`;
        });
    this.actorDS.dataField('results');
    
  }

  public onActorSelected(selectedItem: CompleterItem) {
    if (selectedItem) {
      this.actorSelected = true;
      this.onUserSelected.emit(selectedItem.originalObject);
      console.log(selectedItem.originalObject);
    } else {
      this.actorSelected = false;
    }
  }
}