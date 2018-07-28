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

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.GetSiteCollectionWorkflowItems(3).subscribe(data => {
      if(data){
        this.workflowItems = data;
        this.activeWorkflowItem = this.workflowItems.find(i => i.Enabled == true);
        this.startDate = new FormControl(new Date(data[0].StartDate));
      }
    });
  }

  OnStartDateChange(val){    
    this.activeWorkflowItem.StartDate = val.month + "/" + val.day + "/" + val.year;
    console.info(this.activeWorkflowItem.StartDate);
  }

}
