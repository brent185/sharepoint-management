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
  }

  ShowAdmins(){
    this.showWorkflow = false;
    this.showAdmins = true;
    this.GetAdmins();
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
    console.info(console.info(e));
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
    console.info(this.activeWorkflowItem.StartDate);
  }

  OnEndDateChange(val){    
    this.activeWorkflowItem.EndDate = val.month + "/" + val.day + "/" + val.year;
    this.appService.SaveWorkflowInstanceItem(this.activeWorkflowItem);
    console.info(this.activeWorkflowItem.EndDate);
  }

  OnDisableDateChange(val){    
    this.activeWorkflowItem.DisableDate = val.month + "/" + val.day + "/" + val.year;
    this.appService.SaveWorkflowInstanceItem(this.activeWorkflowItem);
    console.info(this.activeWorkflowItem.DisableDate);
  }

  OnOwnerAdminOnlyDateChange(val){    
    this.activeWorkflowItem.OwnerAdminOnlyEndDate = val.month + "/" + val.day + "/" + val.year;
    this.appService.SaveWorkflowInstanceItem(this.activeWorkflowItem);
    console.info(this.activeWorkflowItem.OwnerAdminOnlyEndDate);
  }
}
