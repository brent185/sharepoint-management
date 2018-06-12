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
import { Observable } from "rxjs/Rx";
import { createSelector } from 'reselect';
import { SiteUserStatus } from './../enums';

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
  site: Site = null;
  url = null;
  role = SiteRole;
  private contextUser;
  private contextSiteUsersSiteId;
  siteUserStatus = SiteUserStatus;


  constructor(private appService: AppService, public dialog: MatDialog) { 

  }

  openPeoplePicker(site, user): void {

    if(!user){
      user = new SiteUser;
  
      user.Role.ID = this.siteRole;
    }

    console.log(site);
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '800px',
      height: '650px',
      data: { site: site, user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {

    if(!this.contextUser){
      this.contextUser = new SiteUser();
      this.contextUser.Role.ID = this.siteRole;
    }

    this.appService.getSiteById(this.siteId).subscribe((s) => {
      this.site = s;
      this.contextSiteUsersSiteId = this.siteId;

      if(this.site.InheritOwnerAdmins){
        this.contextSiteUsersSiteId = this.site.InheritFromSiteId;
      }

      this.appService.getSiteUsersBySiteId(this.contextSiteUsersSiteId, this.siteRole).subscribe((u) => {      
        this.contextUser = u;
      });
    });
  }
  
  testfunc(siteId: number){
    console.info("YO: " + siteId);
    this.appService.setTest(this.site);
  }
}
