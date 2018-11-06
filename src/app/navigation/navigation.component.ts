import { Component, OnInit } from '@angular/core';
import { AppService } from './../globaldata.service';
import { Router, ActivatedRoute, NavigationStart } from "@angular/router";
import { TabsetComponent } from 'ngx-bootstrap';
import { ViewChild } from '@angular/core'


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  public isAdmin: boolean = false;
  private myMessagesCount;
  private selectedTab = 0;

  constructor(private appService: AppService, private router:Router, private route:ActivatedRoute) {

    this.appService.getLoggedInUser().subscribe(u => { 
      if(u){
        this.isAdmin = u.IsAdmin;
      }      
    });

    // this.appService.GetMyMessagesCount().subscribe(c => {
    //   this.myMessagesCount = c;
    // });

  }
  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  changeTab() {
    this.selectedTab += 1;
    if (this.selectedTab >= 2) this.selectedTab = 0;
  }

  onLinkClick(e){
    e.active = true;
  }

  ngOnInit() {
    this.router.events
    .filter(event=> event instanceof NavigationStart)
    .subscribe((event:NavigationStart)=>{
       console.info(event.url);
    });

  }  
}
