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

@NgModule({
  declarations: [
    AppComponent,
    SiteCollectionComponent,
    NavigationComponent,
    WelcomeUserComponent,
    SiteListComponent,
    SiteTreeComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
