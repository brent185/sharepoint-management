import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AlertModule, TabsModule, ButtonsModule, TooltipModule } from 'ngx-bootstrap';
import { SiteCollectionComponent } from './site-collection/site-collection.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
import { SiteListComponent } from './site-list/site-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SiteTreeComponent } from './site-tree/site-tree.component';
import {DialogOverviewExampleDialog} from './site-tree/site-tree-modal.component';
import { ErrorDialog } from './api/errorModal';
import { PeoplePickerComponent } from './people-picker/people-picker.component';
import { 
  MatAutocompleteModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatSlideToggleModule,
  MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SiteTreeUserComponent } from './site-tree-user/site-tree-user.component';
import { AppService } from './globaldata.service';
import { SharePointApi } from './api/sharePointApi';
import { Ng2CompleterModule } from 'ng2-completer';
import { HttpInterceptor } from './api/interceptor';
import {MatButtonModule} from '@angular/material/button';
import { environment } from '../environments/environment';

// export function logger(reducer: ActionReducer<IAppState>): ActionReducer<IAppState>{
//   return storeLogger()(reducer);
// }

//export const metaReducers: MetaReducer<IAppState>[] = [logger];
//const appReducer = compose(logger, combineReducers)(reducers);
//const appReducer = compose(logger, combineReducers)(rootReducer);

@NgModule({
  declarations: [
    AppComponent,
    SiteCollectionComponent,
    NavigationComponent,
    WelcomeUserComponent,
    SiteListComponent,
    SiteTreeComponent,
    PeoplePickerComponent,
    DialogOverviewExampleDialog,
    ErrorDialog,
    SiteTreeUserComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    ButtonsModule,
    TooltipModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    BrowserModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    Ng2CompleterModule
  ],
  // exports: [
  //   MatAutocompleteModule
  // ],
  providers: [
    AppService,
    SharePointApi,
    HttpInterceptor
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogOverviewExampleDialog,
    ErrorDialog
  ]
})
export class AppModule {
constructor(){

}

 }
