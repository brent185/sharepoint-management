import { Component, OnInit } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TooltipPosition} from '@angular/material';
import { AppService } from './../globaldata.service';
import { AttestationUser, User } from './../user';
import { SiteUserStatus, SiteRole } from './../enums';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-my-sites',
  templateUrl: './my-sites.component.html',
  styleUrls: ['./my-sites.component.css', './../../global.css']
})
export class MySitesComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  sites: AttestationUser[];
  filteredSites: AttestationUser[];
  siteUserStatus = SiteUserStatus;
  loggedInUserDisplayName: string;

  selectedRole: number = null;
  selectedRoleName: string = "All";
  selectedStatus: number = null;
  selectedStatusName: string = "All";

  constructor(private appService: AppService, private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.Init();
    });
  }

  Init(){
    this.appService.getLoggedInUser().subscribe(u => { 
      if(u){
        this.loggedInUserDisplayName = u.DisplayName;
      }      
    });

    this.appService.GetMySites().subscribe(sites => {
      if(sites){
        this.sites = sites;
        this.filteredSites = sites;
      }
    });
  }

  FilterRoles(newSortOrder: number) { 
    this.selectedRole = this.GetSiteRoleName(newSortOrder);
    if(!newSortOrder){
      this.filteredSites = this.sites;
    }else{
      this.filteredSites = this.sites.filter(site => site.Role === newSortOrder);
    }    
  }

  ApplyFilter(status, role){
    this.selectedRole = role;
    this.selectedStatus = status;
    this.selectedRoleName = this.GetSiteRoleName(role);
    this.selectedStatusName = this.GetStatusName(status);
    let s = null;

    if(!role){
      s = this.sites;
    }else{
      s = this.sites.filter(site => site.Role === role);
    }    

    if(status){
      s = s.filter(site => site.Status === status);
    }    
    this.filteredSites = s;
  }

  GetStatusName(status: number){
    if(!status){
      return "All";
    }
    let roleName = null;
    
            switch(status){
                case 1:
                  roleName = "Nominated";
                break;
                case 2:
                roleName = "Confirmed";
                break;                                 
              }
    
            return roleName;
  }

  GetSiteRoleName(role: SiteRole){
    if(!role){
      return "All";
    }
    let roleName = null;
    
            switch(role){
                case 1:
                  roleName = "Business Owner";
                break;
                case 2:
                roleName = "Site Owner";
                break;            
                case 3:
                roleName = "Primary Administrator";            
                break;
                case 4:
                roleName = "Secondary Administrator";              
                break;                        
              }
    
            return roleName;
  }
}
