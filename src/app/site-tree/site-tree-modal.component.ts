import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SiteRole } from './../enums';
import { AppService } from './../globaldata.service';
import { SiteUserStatus } from './../enums';
import { AttestationUser, User } from './../user';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'site-tree-modal-component',
    templateUrl: 'site-tree-modal.component.html',
    styleUrls: ['./site-tree.component.css']
  })
  
  export class SiteTreeModalComponent {
    siteRole = SiteRole;
    siteRoleDescription = null;
    statusName = null;
    status = SiteUserStatus;
    user;
    draftUser = null;
    loggedInUserLoginName;
    isSaving: boolean = false;
    isAdmin: boolean = false;
    deleteConfirmIsVisible = false;

    contrastAdminUser: AttestationUser = null;
    draftUserIsValid: boolean = true;

    constructor(private appService: AppService,
      public dialogRef: MatDialogRef<SiteTreeModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe) {         

        this.user = data.user;
        console.info("USER: " + console.info(data.user));
        switch(data.user.Role){
          case 1:
            data.user.RoleName = "Business Owner";
          break;
          case 2:
            data.user.RoleName = "Site Owner";
          break;            
          case 3:
            data.user.RoleName = "Primary Administrator";
            this.contrastAdminUser = this.appService.GetAttestationUserByRoleID(4);
          break;
          case 4:
            data.user.RoleName = "Secondary Administrator";
            this.contrastAdminUser = this.appService.GetAttestationUserByRoleID(3);
          break;     
            case 5:
            data.user.RoleName = "Optional Administrator";
        break;                    
        }

        data.user.StatusName = this.GetStatusName(data.user);

        this.appService.getLoggedInUser().subscribe(u => { 
          if(u){
            this.loggedInUserLoginName = u.LoginName;
            this.isAdmin = u.IsAdmin;
          }      
        });
      }
      
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    userSelected(e){
      this.draftUser = e;
    }

    GetStatusName(user){
      let status = 'ERROR';

      if(this.data.user.UserIsInvalid){
        status = 'User cannot be found in Active Directory';
        return status;
      }
      if(this.data.user.Status === SiteUserStatus.NotSelected && user.Role != 5){
          status = 'Nomination Required';
          return status;
      }
      if(this.data.user.Status === SiteUserStatus.NotSelected && user.Role === 5){
        status = 'Nomination Optional';
        return status;
    }
      if(this.data.user.Status === SiteUserStatus.Nominated){
        status = 'Nominated on ' + this.datePipe.transform(user.NominatedDate, 'MM/dd/yy') + ' by ' + user.NominatedByDisplayName;
        return status;
      }
      if(this.data.user.Status === SiteUserStatus.Confirmed){
        status = 'Confirmed on ' + this.datePipe.transform(user.ConfirmedDate, 'MM/dd/yy') + ' by ' + user.NominatedByDisplayName;
        return status;
      }
    return status;

    }

    removeSelectedUser(){
      // this.data.user.User.LoginName = null;
      // this.data.user.Status = SiteUserStatus.NotSelected;
      this.draftUser = null;
      this.draftUserIsValid = true;
    }

    DeleteSelectedUser(){
      this.data.user.Status = SiteUserStatus.NotSelected;
      this.data.user.StatusName = this.GetStatusName(this.data.user);
      this.appService.DeleteUser(this.user);
      this.deleteConfirmIsVisible = false;
    }

    SaveUser(){
      if(this.contrastAdminUser && this.contrastAdminUser.User.LoginName === this.draftUser.LoginName){
        this.draftUserIsValid = false;
      }else{
        //this.isSaving = true;
        this.data.user.User.DisplayName = this.draftUser.DisplayName;
        this.data.user.User.LoginName = this.draftUser.LoginName;
        this.data.user.Status = SiteUserStatus.Nominated;
        this.data.user.NominatedDate = new Date();
        this.data.user.StatusName = this.GetStatusName(this.data.user);
        this.draftUser = null;
        this.appService.SaveUser(this.data.user);
        if(!this.isAdmin || (this.data.user.User.LoginName != this.loggedInUserLoginName)){
          //this.isSaving = false;
          this.onNoClick();
        } 
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