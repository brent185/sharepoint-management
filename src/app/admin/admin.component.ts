import { Component, OnInit } from '@angular/core';
import { AppService } from './../globaldata.service';
import {FormControl} from '@angular/forms';
import { TreeNode } from 'primeng/primeng';
import * as _ from "lodash";
import { Observable } from 'rxjs';
import { MatCheckboxChange } from '@angular/material'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public workflowItems;
  public activeWorkflowItem;
  public startDate;
  public activeSite;
  public allSites;
  public showWorkflow = true;
  public showAdmins = false;
  public showReporting = false;
  public showBulkEdit = false;
  public admins;
  public userIsSelected = false;
  public selectedUser;
  
  public farmsWebAppsUnfiltered;
  public farmsWebApps;
 
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
    this.showBulkEdit = false;
  }

  ShowAdmins(){
    this.showWorkflow = false;
    this.showAdmins = true;
    this.showReporting = false;
    this.showBulkEdit = false;
    this.GetAdmins();
  }

  ShowReporting(){
    this.showWorkflow = false;
    this.showAdmins = false;
    this.showReporting = true;
    this.showBulkEdit = false;
  }

  ShowBulkEdit(){
    this.showWorkflow = false;
    this.showAdmins = false;
    this.showReporting = false;
    this.showBulkEdit = true;
    this.GetFarmWebApps();
  }

  GetFarmWebApps(){
    this.appService.GetFarmWebAppHierarchy().subscribe(data => {
      if(data){
        data = this.ProcessFarmWebApps(data);
        this.farmsWebAppsUnfiltered = data;
        this.farmsWebApps = data;      
      }
    });
  }

  GetSiteCollections(webApp){
    if(!webApp.Sites){
      this.appService.GetSiteCollections(webApp.ID).subscribe(data => {
        if(data){
          this.InitSites(data, 4);
          webApp.Sites = Observable.of(data);          
        }
      });
    }
  }

  InitSites(site, level) {    
    site.forEach(s => {
      s.Level = level;
      s.IsChecked = false;
      s.Type = 's';
      if(s.SubSites){              
          this.InitSites(s.SubSites, level + 1);
      }
    });
  }

  private ProcessFarmWebApps(data){
    data.forEach(element => {
      element.Level = 0;
      element.Type = 'f';
      element.IsOpen = false;
      element.IsChecked = false;
      element.IsIndeterminate = false;
      element.WebApplications.forEach(webApp => {
        webApp.Level = 2;
        webApp.Type = 'w';
        webApp.IsOpen = false;
        webApp.IsChecked = false;
        webApp.IsIndeterminate = false;
      });
    });
    console.info(console.info(data));
    return data;
    
  }

  ClickCheckbox(event: MatCheckboxChange, item){
    //console.info(item);
    item.IsChecked = event.checked ? true : false;
    
    if(item.Type === 'f'){
      item.WebApplications.forEach(element => {
        element.IsChecked = item.IsChecked;
        element.Boo = true;
      });
    }
    if(item.Type === 'w'){
     this.CheckIndeterminate('f', item.FarmSPID)
    }
  }

  CheckIndeterminate(type, spId){
    // are all children checked?
    let count = 0;

    if(type === 'f'){
      let farm = this.farmsWebApps.find(f => {
        return f.SPID === spId;
      });
      if(farm && farm.IsChecked){
        farm.WebApplications.forEach(element => {          
          if(!element.IsChecked){
            count++;
          }
        });
        if(count > 0){
          farm.IsIndeterminate = true;
          console.info("TRUE");
        }else{
          farm.IsIndeterminate = false;
          console.info("FALSE");
        }
      }
      console.info(console.info(farm));
    }
    
    //return isIndeterminate;
  }

  GetWidth(level) {
    const newLevel = level * 10;
    return newLevel + 'px';
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
