import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { Site } from './site';

import { Sites } from './mock-sites';
import { loggedInUser } from './mock-loggedin-user'; 

@Injectable()
export class AppService{
    private sites;
    private flatSites;
    private users;

    constructor(){

    }

    private loggedInUser = new BehaviorSubject(loggedInUser);
    private site = new BehaviorSubject(null);
    private flats = new BehaviorSubject(null);
    public Users = this.users;

    getLoggedInUser<T>(): Observable<User> {
        return this.loggedInUser.asObservable();
    }

    getSite<T>(): Observable<Site[]> {
        this.initSites(Sites, 1);
        this.setInheritance(Sites, null);
        this.site.next(Sites);
        this.flatSites = this.flattenSites(Sites, []);
        this.flats.next(this.flatSites);
        console.info(this.flatSites);
        return this.site.asObservable();
    }

    getSiteById<T>(siteId: number): Observable<Site> {
        // let flatSite = this.flatSites.find(s => s.SiteID = siteId);
        // console.info(flatSite.SiteID);
        // return new BehaviorSubject(null); 
        //return this.flatSites.map(s => s.find(x => x.SiteID === siteId));
        return this.flats.map(s => s.find(x => x.SiteID === siteId));
    }

    getFlatSites(): Observable<any>{
        return this.flats.asObservable();
    }
    // getSiteBySpId<T>(siteId: number){
    //     let flatSite = this.flatSites.find(s => s.SiteID === siteId);
    //     return flatSite;
    // }

    setSites(val: any[]){
      this.sites = val;
    }

    getSites(){
      return this.sites;
    }

    // getSiteBySPId(sites, spId){
    //     if(!sites){
    //         sites = this.sites;
    //     }
    //     for (let o of this.sites || []) {
    //         if (o.SiteID == spId) return o
    //         const o_ = this.getSiteBySPId(o.SubSites, spId);
    //         if (o_) return o_
    //       }
    // }

    getUsersBySPId(users, spId){
        if(!users){
            users = this.Users;
        }
        return users.filter(u => u.SiteID === spId);
    }
    
    SetUser(user, spId){
        this.Users.push(user);
    }

    initSites(site, level) {
        site.forEach(s => {
          s.isSelected = false;
          s.level = level;
          s.inheritOwnerAdmins = true;
    
          if(level === 1){
            s.inheritOwnerAdmins = false;
          }
    
          if(level === 2){
            s.isOpen = false;
          }else{
            s.isOpen = true;
          }
          
          if(s.SubSites){
              this.initSites(s.SubSites, level + 1);
          }
        });
        //this.setInheritance(this.list, null);
      }
    
    setInheritance(sites, inheritFromSiteId){
        sites.forEach(s => {
            if(!inheritFromSiteId){
            s.inheritFromSiteId = s.SiteID
            }
            if(s.inheritOwnerAdmins){
            s.inheritFromSiteId = inheritFromSiteId;
            }else{
            s.inheritFromSiteId = s.SiteID
            }
            if(s.SubSites.length > 0){
            this.setInheritance(s.SubSites, s.inheritFromSiteId)
            }
        });
    }

      
    flattenSites(site, flatArray){
        if(!flatArray){
            flatArray = [];
        }
        site.forEach(s => {
            flatArray.push(s);
            if(s.SubSites){
                this.flattenSites(s.SubSites, flatArray);
            }
        });
        return flatArray;
    }
}