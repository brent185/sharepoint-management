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
  MatPaginatorModule,
  MatTable,
  MatDialogModule, 
  MatDialogRef, 
  MAT_DIALOG_DATA,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SiteTreeUserComponent } from './site-tree-user/site-tree-user.component';
import { AppService } from './globaldata.service';
import { SharePointApi } from './api/sharePointApi';
import { Ng2CompleterModule } from 'ng2-completer';
import { HttpInterceptor } from './api/interceptor';
import {MatButtonModule} from '@angular/material/button';
import { environment } from '../environments/environment';
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { BulkEditComponent } from './bulk-edit/bulk-edit.component';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import {MatTableDataSource} from '@angular/material';

const appRoutes: Routes = [
  {path: '', redirectTo: 'mymessages', pathMatch: 'full'},
  {path: 'mysites', component: MyMessagesComponent},
  {path: 'mymessages', component: MyMessagesComponent},
  // {path: 'attestation/:id', component: SiteTreeComponent},
  {path: 'attestation', component: SiteTreeComponent},
  {path: 'attestation/:siteCollectionSpId/:siteCollectionId', component: SiteTreeComponent},
  {path: 'attestation/:siteCollectionSpId/:siteCollectionId/:confirmRole',  component: SiteTreeComponent},
  {path: '', component: MyMessagesComponent}
];

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
    SiteTreeUserComponent,
    // MatPaginatorModule,
    MyMessagesComponent,
    BulkEditComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    ButtonsModule,
    TooltipModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    // MatTableDataSource,
    MatPaginatorModule,
    RouterModule.forRoot(appRoutes),
    MatTabsModule,
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
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [
    AppService,
    SharePointApi,
    HttpInterceptor,
    RouterModule
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
