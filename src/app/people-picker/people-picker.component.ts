import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';
//import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { AppService } from './../globaldata.service';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-people-picker',
  templateUrl: './people-picker.component.html',
  styles: [`.form-control { width: 300px; }`],
  styleUrls: ['./people-picker.component.css']
})
export class PeoplePickerComponent implements OnInit {
  @Output() onUserSelected: EventEmitter<any> = new EventEmitter<any>();
  public model: any;
  public users: any;
  searching = false;
  searchFailed = false;
  public actorSelected = false;

  constructor(private appService: AppService) {

  }

  ngOnInit() {
  
  }

  formatMatches = (value: any) => { (typeof value === 'object') ? value=value.SearchDisplayName : value=value; return value};

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term =>
      this.appService.GetUserByNameSearch(term)
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

// import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CompleterService, CompleterData, RemoteData, CompleterItem } from 'ng2-completer';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/Rx';
// import { RequestOptions } from '@angular/http';
// import { constants } from './../constants';
// import { searchUsers } from './../mock-userSearch';

// @Component({
//   selector: 'app-people-picker',
//   templateUrl: './people-picker.component.html',
//   encapsulation: ViewEncapsulation.None,
//   styleUrls: ['./people-picker.component.css']
// })
// export class PeoplePickerComponent {
//   @Output() onUserSelected: EventEmitter<any> = new EventEmitter<any>();

//   public actor: string;

//   public actorSelected = false;

//   public actorDS: RemoteData;

//   constructor(private http: HttpClient, completerService: CompleterService) {
//     let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
//     this.actorDS = completerService.remote(null, 'SearchDisplayName', 'SearchDisplayName');
//     this.actorDS.requestOptions(requestOptions);
//     this.actorDS.urlFormater(term => {          
//             return `${constants.sharePointApiRootUrl}/sharepoint/user/search/${term}`;            
//         });
//     this.actorDS.dataField('');
//   }

//   public onActorSelected(selectedItem: CompleterItem) {
//     if (selectedItem) {
//       this.actorSelected = true;
//       this.onUserSelected.emit(selectedItem.originalObject);
//       console.log(selectedItem.originalObject);
//     } else {
//       this.actorSelected = false;
//     }
//   }
// }