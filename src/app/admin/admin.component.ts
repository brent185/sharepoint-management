import { Component, OnInit } from '@angular/core';
import { AppService } from './../globaldata.service';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  workflowItems;
  activeWorkflowItem;
  startDate;
  activeSite;
  allSites;
  public showWorkflow = true;
  public showAdmins = false;
  public showReporting = false;
  public admins;
  public userIsSelected = false;
  public selectedUser;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.GetSiteCollectionWorkflowItems().subscribe(data => {
      if(data){
        this.workflowItems = data;
        this.activeWorkflowItem = this.workflowItems.find(i => i.Enabled == true);
        this.startDate = new FormControl(new Date(data[0].StartDate));
      }
    });
  }

  ShowWorkflow(){
    this.showWorkflow = true;
    this.showAdmins = false;
    this.showReporting = false;
  }

  ShowAdmins(){
    this.showWorkflow = false;
    this.showAdmins = true;
    this.showReporting = false;
    this.GetAdmins();
  }

  ShowReporting(){
    this.showWorkflow = false;
    this.showAdmins = false;
    this.showReporting = true;
  }

  GetAdmins(){
    this.appService.GetAdmins().subscribe(data => {
      if(data){
        this.admins = data;
      }
    });
  }

  SaveAdmin(){
    if(this.selectedUser){
      this.appService.SaveAdmin(this.selectedUser.LoginName);
    }
    this.RemoveSelectedUser();
  }

  DeleteAdmin(loginName){
      this.appService.DeleteAdmin(loginName);
  }

  UserSelected(e){
    this.userIsSelected = true;
    this.selectedUser = e;

  }

  RemoveSelectedUser(){
    this.userIsSelected = false;
    this.selectedUser = null;
  }


  OnStartDateChange(val){    
    this.activeWorkflowItem.StartDate = val.month + "/" + val.day + "/" + val.year;
    this.appService.SaveWorkflowInstanceItem(this.activeWorkflowItem);
  }

  OnEndDateChange(val){    
    this.activeWorkflowItem.EndDate = val.month + "/" + val.day + "/" + val.year;
    this.appService.SaveWorkflowInstanceItem(this.activeWorkflowItem);
  }

  OnDisableDateChange(val){    
    this.activeWorkflowItem.DisableDate = val.month + "/" + val.day + "/" + val.year;
    this.appService.SaveWorkflowInstanceItem(this.activeWorkflowItem);
  }

  OnOwnerAdminOnlyDateChange(val){    
    this.activeWorkflowItem.OwnerAdminOnlyEndDate = val.month + "/" + val.day + "/" + val.year;
    this.appService.SaveWorkflowInstanceItem(this.activeWorkflowItem);
  }
}
