import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompleterService, CompleterData, RemoteData, CompleterItem } from 'ng2-completer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { RequestOptions } from '@angular/http';
import { constants } from './../constants';
import { searchUsers } from './../mock-userSearch';

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
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    this.actorDS = completerService.remote(null, 'DisplayName', 'DisplayName');
    this.actorDS.requestOptions(requestOptions);
    this.actorDS.urlFormater(term => {          
            return `${constants.sharePointApiRootUrl}/sharepoint/user/search/${term}`;
            
        });
    this.actorDS.dataField('');
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