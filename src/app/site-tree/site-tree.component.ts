import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogOverviewExampleDialog} from './site-tree-modal.component';
import { Sites } from './../mock-sites';
import { users } from './../mock-users';
import { AppService } from './../globaldata.service';
import { SiteRole } from './../enums';
import { IAppState } from './../state';
import { Observable } from "rxjs/Rx"
import { Site } from './../site';
import { Store } from '@ngrx/store';
import { User } from './../user';

@Component({
  selector: 'app-site-tree',
  templateUrl: './site-tree.component.html',
  styleUrls: ['./site-tree.component.css']
    //providers: [AppService]
})

export class SiteTreeComponent implements OnInit {
  
  contextUser: Observable<User>;
  sites: Observable<Site[]>;

  private i = 0;
  public list = Sites;
  public users = users;
  public siteRole = SiteRole;

  animal: string;
  name: string;

  constructor(private appService: AppService, public dialog: MatDialog, private store:Store<IAppState>) {
    

  }

  ngOnInit() {
    //this.contextUser$.subscribe(contextUser => this.contextUser = contextUser);
    //this.siteHierarchy$.subscribe(siteState => this.sites = siteState);
    //this.initSites(this.sites, 1);
    //this.setSelectedSite(1611);
    //this.appService.setSites(this.list);
    this.sites = this.store.select(state => state.siteHierarchy)
    this.contextUser = this.store.select(state => state.contextUser)
    this.appService.Users = this.users;
  }

  // initSites(site, level) {
  //   site.forEach(s => {
  //     s.isSelected = false;
  //     s.level = level;
  //     s.inheritOwnerAdmins = true;

  //     if(level === 1){
  //       s.inheritOwnerAdmins = false;
  //     }

  //     if(level === 2){
  //       s.isOpen = false;
  //     }else{
  //       s.isOpen = true;
  //     }
      
  //     if(s.SubSites){
  //         this.initSites(s.SubSites, level + 1);
  //     }
  //   });
  //   this.setInheritance(this.list, null);
  // }

  // setInheritance(sites, inheritFromSiteId){
  //   sites.forEach(s => {
  //     if(!inheritFromSiteId){
  //       s.inheritFromSiteId = s.SiteID
  //     }
  //     if(s.inheritOwnerAdmins){
  //       s.inheritFromSiteId = inheritFromSiteId;
  //     }else{
  //       s.inheritFromSiteId = s.SiteID
  //     }
  //     if(s.SubSites.length > 0){
  //       this.setInheritance(s.SubSites, s.inheritFromSiteId)
  //     }
  //   });
  // }

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
