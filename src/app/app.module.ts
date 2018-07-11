import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertModule, TabsModule, ButtonsModule, TooltipModule } from 'ngx-bootstrap';
import { SiteCollectionComponent } from './site-collection/site-collection.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
import { SiteListComponent } from './site-list/site-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SiteTreeComponent } from './site-tree/site-tree.component';
import {SiteTreeModalComponent} from './site-tree/site-tree-modal.component';
import { ErrorDialog } from './api/errorModal';
import { PeoplePickerComponent } from './people-picker/people-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  MatToolbarModule
  // MatTooltipModule,
} from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { MySitesComponent } from './my-sites/my-sites.component';
import 'hammerjs';
import { AttestationHistoryComponent } from './attestation-history/attestation-history.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'mysites', pathMatch: 'full'},
  {path: 'mysites', component: MySitesComponent},
  {path: 'mymessages', component: MyMessagesComponent},
  {path: 'attestation', component: SiteTreeComponent},
  
  {path: 'attestation/:siteCollectionSpId', component: SiteTreeComponent},
  {path: 'attestation/:siteCollectionSpId/:confirmRole',  component: SiteTreeComponent},
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
    SiteTreeModalComponent,
    ErrorDialog,
    SiteTreeUserComponent,
    // MatIcon,
    MyMessagesComponent,
    BulkEditComponent,
    MySitesComponent,
    AttestationHistoryComponent
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
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    NgbModule.forRoot(),
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
    RouterModule,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SiteTreeModalComponent,
    AttestationHistoryComponent,
    ErrorDialog
  ]
})
export class AppModule {
constructor(){

}

 }
