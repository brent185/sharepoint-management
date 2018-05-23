import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SiteRole } from './../enums';
import { AppService } from './../globaldata.service';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
    styleUrls: ['./site-tree.component.css']
  })
  
  export class DialogOverviewExampleDialog {
    siteRole = SiteRole;
    
    userSelected(e){
      this.data.user.User.DisplayName = e.name;
      this.data.user.User.LoginName = 'test';
      console.info("SELECTED: " + console.info(this.data.user));
      this.appService.SetUser(this.data.user, 1);
    }
    constructor(private appService: AppService,
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { 
        console.log("site: " + console.log(data));
        
      }
      
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }