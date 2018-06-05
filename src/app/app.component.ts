import { Component, OnInit } from '@angular/core';
import { LOGIN_USER, INIT_SITES } from './actions';
// import { IAppState } from './store';
import { Sites } from './mock-sites';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'app';

  constructor(){

  }

  ngOnInit(){
    //this.ngRedux.dispatch({type: "LOGIN_USER"});
    //this.ngRedux.dispatch({type: INIT_SITES, payload: Sites});
    // this.store.dispatch({type: "LOGIN_USER"});
  }
}

