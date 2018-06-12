import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogOverviewExampleDialog } from './site-tree-modal.component';
import { Sites } from './../mock-sites';
import { users } from './../mock-users';
import { AppService } from './../globaldata.service';
import { SiteRole } from './../enums';
import { Observable } from "rxjs/Rx"
import { Site } from './../site';
import { User } from './../user';

@Component({
  selector: 'app-site-tree',
  templateUrl: './site-tree.component.html',
  styleUrls: ['./site-tree.component.css']
    //providers: [AppService]
})

export class SiteTreeComponent implements OnInit {
  
  contextUser: Observable<User>;
  list: Site[];

  showFullUrls = false;

  private i = 0;
  public users = users;
  public siteRole = SiteRole;
  firstName: string = null;
  animal: string;
  name: string;

  constructor(private appService: AppService, public dialog: MatDialog) {
    
    this.appService.getLoggedInUser().subscribe(u => { 
      if(u){
        this.firstName = u.DisplayName;
        this.appService.getSite().subscribe(s => {           
          this.list = s;
        });
      }      
    });
  }

  ngOnInit() {

  }

  toggleInheritance(site){
    if(site.inheritOwnerAdmins){
      site.inheritOwnerAdmins = false;
    }else{
      site.inheritOwnerAdmins = true;
    }
    
    //this.setInheritance(this.list, null);
  }

  setSelectedSite(siteId){
    const x = this.findDFS(this.list, siteId);
    x.isSelected = true;
  }

  toggleFullUrls(e){
    if(e.checked){
      this.showFullUrls = true;
    }else{
      this.showFullUrls = false;
    }
  }

  openParent(parentSPID){

  }

  getParents(childSPID){
    const parents = [];
    const context = this.getSiteBySPID(this.list, childSPID);
    
    let i;

    for(i=context.length; i > 0; i--){
      let parent = this.getSiteBySPID(this.list, childSPID);
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      height: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openPeoplePicker(item): void {
    console.log(item);
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      height: '500px',
      data: { site: item }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  getWidth(level) {
    const newLevel = level * 20;
    return newLevel + 'px';
    // console.log(newLevel);
  }

  toggleChildren(event, siteId) {
    // const x = this.list.find(a => a.id === siteId);
    const x = this.findDFS(this.list, siteId);

    if (x.isOpen) {
      x.isOpen = false;
      //this.hideChildren(x);
    } else {
      x.isOpen = true;
      //this.showChildren(x);
    }
    //this.setEvenOdd(1);
  }

  hideChildren(parent) {
    if (parent.SubSites) {
      parent.SubSites.forEach(c => {
        c.isVisible = false;
        if (c.SubSites) {
          this.hideChildren(c);
        }
      });
    }
  }

  showChildren(parent) {
    if (parent.SubSites) {
      parent.SubSites.forEach(c => {
        c.isVisible = true;
        if (c.SubSites) {
          this.hideChildren(c);
        }
      });
    }
  }

  findDFS(objects, id) {
    for (let o of objects || []) {
      if (o.SiteID == id) return o
      const o_ = this.findDFS(o.SubSites, id);
      if (o_) return o_
    }
  }

  public getSiteBySPID(objects, id) {
    for (let o of objects || []) {
      if (o.SPID == id) return o
      const o_ = this.findDFS(o.SubSites, id);
      if (o_) return o_
    }
  }

}
