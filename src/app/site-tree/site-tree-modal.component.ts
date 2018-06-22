import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SiteRole } from './../enums';
import { AppService } from './../globaldata.service';
import { SiteUserStatus } from './../enums';
import { AttestationUser} from './../user';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
    styleUrls: ['./site-tree.component.css']
  })
  
  export class DialogOverviewExampleDialog {
    siteRole = SiteRole;
    siteRoleDescription = null;
    statusName = null;
    status = SiteUserStatus;
    user;
    draftUser = null;
    loggedInUserLoginName = 'basplun1';

    constructor(private appService: AppService,
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe) {         

        this.user = data.user;

        switch(data.user.Role){
          case 1:
            data.user.RoleName = "Business Owner";
          break;
          case 2:
            data.user.RoleName = "Site Owner";
          break;            
          case 3:
            data.user.RoleName = "Primary Administrator";
          break;
          case 4:
            data.user.RoleName = "Secondary Administrator";
          break;                        
        }

        data.user.StatusName = this.GetStatusName(data.user);
      }
      
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    userSelected(e){
      this.draftUser = e;
    }

    GetStatusName(user){
      let status = 'ERROR';

      if(this.data.user.Status === SiteUserStatus.NotSelected){
          status = 'No user selected';
          return status;
      }
      if(this.data.user.Status === SiteUserStatus.Nominated){
        status = 'Nominated on ' + this.datePipe.transform(user.NominatedDate, 'MM/dd/yy') + ' by ' + 'Asplund, Brent'; //user.NominatedByDisplayName;
        return status;
      }
      if(this.data.user.Status === SiteUserStatus.Confirmed){
        status = 'Confirmed on ' + this.datePipe.transform(user.ConfirmedDate, 'MM/dd/yy') + ' by ' + 'Asplund, Brent'; //user.NominatedByDisplayName;
        return status;
      }
    return status;

    }

    removeSelectedUser(){
      // this.data.user.User.LoginName = null;
      // this.data.user.Status = SiteUserStatus.NotSelected;
      this.draftUser = null;
    }

    DeleteSelectedUser(){
      this.data.user.Status = SiteUserStatus.NotSelected;
      this.data.user.StatusName = this.GetStatusName(this.data.user);
      this.appService.DeleteUser(this.user);
    }

    SaveUser(){
      this.data.user.User.DisplayName = this.draftUser.DisplayName;
      this.data.user.User.LoginName = this.draftUser.LoginName;
      this.data.user.Status = SiteUserStatus.Nominated;
      this.data.user.NominatedDate = new Date();
      this.data.user.StatusName = this.GetStatusName(this.data.user);
      this.draftUser = null;
      this.appService.SaveUser(this.data.user);
      if(this.data.user.User.LoginName != this.loggedInUserLoginName){
        // this.dialogRef.close();
        this.onNoClick();
      } 
    }

    ConfirmUser(){
      this.data.user.Status = SiteUserStatus.Confirmed;
      this.data.user.StatusName = this.GetStatusName(this.data.user);
      this.data.user.ConfirmedDate = new Date();
      this.appService.ConfirmUser(this.data.user);
      // this.dialogRef.close();
      this.onNoClick();
    }
  
  }