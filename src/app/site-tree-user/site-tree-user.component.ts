import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';
import { SiteTreeComponent } from './../site-tree/site-tree.component';
//import { sites } from './../state';
import { AppService } from './../globaldata.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogOverviewExampleDialog} from './../site-tree/site-tree-modal.component';
import { SiteRole } from './../enums';
import { SiteUser } from './../user';
import { Site } from './../site';
import { IAppState } from './../store';
import { Observable } from "rxjs/Rx"
import { createSelector } from 'reselect'

@Component({
  selector: 'app-site-tree-user',
  templateUrl: './site-tree-user.component.html',
  styleUrls: ['./site-tree-user.component.css']
  //providers: [AppService]
})
export class SiteTreeUserComponent implements OnInit {

  @Input() siteRole: SiteRole;
  @Input() siteId: number;

  contextSite: Observable<any>;
  site = null;
  role = SiteRole;

  //private contextSite;
  private contextUser;

  constructor(private appService: AppService, public dialog: MatDialog) { 
  }

  openPeoplePicker(item, user): void {
    console.log(item);
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      height: '500px',
      data: { site: item, user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    //this.contextSite = this.ngRedux.select(state => state.flatSites.find(s=>s.SiteID === this.siteId));
    //const users = this.appService.getUsersBySPId(null, this.contextSite.inheritFromSiteId);
    if(!this.contextUser){
      this.contextUser = new SiteUser();
      this.contextUser.Role.ID = this.siteRole;
    }
  }

}
