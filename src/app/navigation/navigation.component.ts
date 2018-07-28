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

    this.appService.GetMyMessagesCount().subscribe(c => {
      this.myMessagesCount = c;
    });

  }
  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
    //this.router.navigate(['./attestation']);
  }

  changeTab() {
    this.selectedTab += 1;
    if (this.selectedTab >= 2) this.selectedTab = 0;
  }

  onLinkClick(e){
    console.info("E: " + console.info(e));
    e.active = true;
  }

  tabClick(){}

  fuho(){
    console.info("HO");
    this.router.navigate(['./attestation']);
  }
   
  get

  ngOnInit() {
    this.router.events
    .filter(event=> event instanceof NavigationStart)
    .subscribe((event:NavigationStart)=>{
       console.info(event.url);
    });

  }

  
}
