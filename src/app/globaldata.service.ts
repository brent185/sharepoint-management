import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { Site } from './site';
import { SharePointApi } from './api/sharePointApi';
import { Sites } from './mock-sites';
import { SiteUser } from './user';
import { users } from './mock-users';
import { SiteUserStatus } from './enums';

@Injectable()
export class AppService{
    private sites;
    private flatSites;
    private _users;

    constructor(private spApi: SharePointApi){

    }

    private loggedInUser = new BehaviorSubject(null);
    private site = new BehaviorSubject(null);
    private flats = new BehaviorSubject<Site[]>(null);
    private siteUsers = new BehaviorSubject<SiteUser[]>(null);
    //public Users = this.users;
    private profile = new BehaviorSubject<User>(null);

    getLoggedInUser<T>(): Observable<User> {
        let user = new User;
        
        this.spApi.getUser().subscribe(data => {
            if(data){
                user.FirstName = data.FirstName;
                user.LastName = data.LastName;
                user.DisplayName = user.FirstName + ' ' + user.LastName;
                user.IsAdmin = true;
                this.profile.next(user);
            }
        });
        
        return this.profile.asObservable();
    }

    GetUserByNameSearch(term: string){

        return this.spApi.getUserByNameSearch(term).map(data => {
            return data;
        });

    }

    getSite<T>(): Observable<Site[]> {
        this._users = users;
        this.siteUsers.next(this._users);

        this.initSites(Sites, 1);
        this.setInheritance(Sites, null);
        this.site.next(Sites);
        this.flatSites = this.flattenSites(Sites, []);
        this.flats.next(this.flatSites);
        console.info(this.flatSites);
        return this.site.asObservable();
    }

    SaveUser(user: SiteUser){
        let selectedUser = this._users.find(u => u.Role.ID === user.Role.ID);
        selectedUser.User.LoginName = user.User.LoginName;
        selectedUser.User.DisplayName = user.User.DisplayName;
        selectedUser.Status = SiteUserStatus.Nominated;
        selectedUser.NominatedDate = new Date();
        this.siteUsers.next(this._users);
        console.info("USERS: " + console.info(users));
    }

    ConfirmUser(user: SiteUser){
        let selectedUser = this._users.find(u => u.Role.ID === user.Role.ID);
        selectedUser.Status = SiteUserStatus.Confirmed;
        selectedUser.ConfirmedDate = new Date();
        this.siteUsers.next(this._users);
    }
    
    DeleteUser(user: SiteUser){
        let selectedUser = this._users.find(u => u.Role.ID === user.Role.ID);
        if(selectedUser){
            selectedUser.Status = SiteUserStatus.NotSelected;
            selectedUser.NominatedByLoginName = null;
            selectedUser.NominatedDate = null;
            selectedUser.ConfirmedByLoginName = null;
            selectedUser.ConfirmedByDisplayName = null;
            selectedUser.ConfirmedDate = null;
            selectedUser.UserIsInvalid = false;
            selectedUser.User = new User;
        }
        
        this.siteUsers.next(this._users);
    }

    getSiteById<T>(siteId: number): Observable<Site> {
        return this.flats.map(s => s.find(x => x.SiteID === siteId));
    }

    getSiteUsersBySiteId(siteId: number, roleId: number): Observable<SiteUser> {
        // this.siteUsers.next(users);
        // return this.siteUsers;
        return this.siteUsers.map(u => u.find(x => x.SiteID === siteId && x.Role.ID === roleId));
    }

    getFlatSites(): Observable<any>{
        return this.flats.asObservable();
    }

    setSites(val: any[]){
      this.sites = val;
    }

    getSites(){
      return this.sites;
    }

    setTest(site: Site){
        //this.flats.next(this.flats.map(x => x.find(s => s.SiteID === site.SiteID)));
        let x = this.flatSites.find(z => z.SiteID === site.SiteID);
        let y = this.flatSites.find(z => z.SiteID === 1560)
        x.inheritOwnerAdmins = true;
        y.inheritOwnerAdmins = false;
        this.flats.next(this.flatSites);
    }

    initSites(site, level) {
        site.forEach(s => {
          s.isSelected = false;
          s.level = level;
          s.InheritOwnerAdmins = true;
          s.displayUrl = s.Url;

          if(level === 1){         
            s.InheritOwnerAdmins = false;
            s.displayUrl = s.Url;
          }else{
            let urlParts = s.Url.split('/');
            s.displayUrl = "/" + urlParts[urlParts.length - 1];
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
      }
    
    setInheritance(sites, inheritFromSiteId){
        sites.forEach(s => {
            if(!inheritFromSiteId){
                s.InheritFromSiteId = s.SiteID
            }
            if(s.InheritOwnerAdmins){
                s.InheritFromSiteId = inheritFromSiteId;
            }else{
                s.InheritFromSiteId = s.SiteID
            }
            if(s.SubSites.length > 0){
            this.setInheritance(s.SubSites, s.InheritFromSiteId)
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