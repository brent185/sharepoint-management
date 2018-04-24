import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AlertModule, TabsModule } from 'ngx-bootstrap';
import { SiteCollectionComponent } from './site-collection/site-collection.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
import { SiteListComponent } from './site-list/site-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SiteTreeComponent } from './site-tree/site-tree.component';
import { PeoplePickerComponent } from './people-picker/people-picker.component';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SiteCollectionComponent,
    NavigationComponent,
    WelcomeUserComponent,
    SiteListComponent,
    SiteTreeComponent,
    PeoplePickerComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule
  ],
  // exports: [
  //   MatAutocompleteModule
  // ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
