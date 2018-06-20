import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { User } from './user';
import { Site } from './site';
import { SharePointApi } from './api/sharePointApi';
import { Sites } from './mock-sites';
import { AttestationUser } from './user';
// import { users } from './mock-users';
import { SiteUserStatus } from './enums';
import { Web, SiteAttestation } from './site';

@Injectable()
export class AppService{
    private sites;
    private flatSites;
    private _users;
    private _webs;
    private _profile;
    private _attestationUsers;
    private _activeTabIndex;
    private _myMessagesCount: number = 0;
    private _contextSiteCollectionSpId;
    
    private _siteAttestation: SiteAttestation;

    constructor(private spApi: SharePointApi){

    }

    private loggedInUser = new BehaviorSubject(null);
    private site = new BehaviorSubject(null);
    private flats = new BehaviorSubject<Web[]>(null);
    private siteUsers = new BehaviorSubject<AttestationUser[]>(null);
    private profile = new Subject<User>();
    private webs = new BehaviorSubject<Web[]>(null);
    public attestationUsers = new BehaviorSubject<AttestationUser[]>(null);
    public myMessagesCount = new BehaviorSubject<number>(this._myMessagesCount);
    public contextSiteCollectionSpId = new Subject<string>();

    public siteAttestation = new Subject<SiteAttestation>();

    GetSiteAttestation(siteSpId: string, siteId: number): Observable<SiteAttestation> {

        this._siteAttestation = new SiteAttestation;

        this.spApi.GetWebHierarchyBySiteSpId(siteSpId).subscribe(data => {
            if(data) {
                this._siteAttestation.Hierarchy = [data];
                this.initSites(this._siteAttestation.Hierarchy, 1);
                this.setInheritance(this._siteAttestation.Hierarchy, null);
                this._siteAttestation.FlatSites = this.flattenSites(this._siteAttestation.Hierarchy, []);

                this.spApi.GetAttestationUsersBySiteId(siteId).subscribe(users => {
                    if(users){
                        this._siteAttestation.AttestationUsers = users;
                    }
                    this.siteAttestation.next(this._siteAttestation);   
                });
                             
            }
         });
         
         return this.siteAttestation.asObservable();
    }

    GetContextSiteCollectionSpId(): Observable<string> {
        return this.contextSiteCollectionSpId.asObservable();
    }

    SetContextSiteCollectionSpId(spId: string){
        this._contextSiteCollectionSpId = spId;
        this.contextSiteCollectionSpId.next(this._contextSiteCollectionSpId);
    }

    GetMyMessagesCount(): Observable<number> {
        return this.myMessagesCount.asObservable();
    }

    SetMyMessagesCount(count: number){
        this._myMessagesCount = count;
        this.myMessagesCount.next(this._myMessagesCount);
    }

    getLoggedInUser<T>(): Observable<User> {
        if(!this._profile){
            this._profile = new User;
            return this.getLoggedInUserApi();
        }else{
            return this.profile.asObservable();
        }
    }

    getAttestationUsers(siteCollectionId: number): Observable<AttestationUser[]> {

        // if(!this._attestationUsers){
        //     //this._attestationUsers = [new AttestationUser];
             return this.GetAttestationUsersBySiteIdApi(siteCollectionId);
        // }else{
        //     return this.attestationUsers.asObservable();
        // }

        //return this.attestationUsers.asObservable();
    }

    GetAttestationUsersBySiteIdApi(id: number){
        this.spApi.GetAttestationUsersBySiteId(id).subscribe(data => {
            if(data){
                this._attestationUsers = data;
                this.attestationUsers.next(this._attestationUsers);
                //console.info("USERSAP: " + console.info(this._attestationUsers));
            }
        });
        return this.attestationUsers.asObservable();
    }

    getLoggedInUserApi(): Observable<User> {
        let user = new User;
        
        this.spApi.getUser().subscribe(data => {
            if(data){
                user.FirstName = data.FirstName;
                user.LastName = data.LastName;
                user.DisplayName = user.FirstName + ' ' + user.LastName;
                user.IsAdmin = true;
                this._profile = user;
                this.profile.next(this._profile);
            }
        });
        
        return this.profile.asObservable();
    }

    GetWebHierarchyByWebUrl(url: string): Observable<Web[]> {
        //this.getAttestationUsers();

        this.spApi.GetWebHierarchyByWebUrl(url).subscribe(data => {
           if(data) {
               this._webs = [data];
               this.initSites(this._webs, 1);
               this.setInheritance(this._webs, null);               
               this.flatSites = this.flattenSites(this._webs, []);
               this.flats.next(this.flatSites);
               this.webs.next(this._webs);
               console.info("X: " + console.info(this._webs));
           }
        });

        return this.webs.asObservable();
    }


    GetWebHierarchyBySiteSpId(spId: string): Observable<Web[]> {
        this.ClearAttestationSite();

        this.spApi.GetWebHierarchyBySiteSpId(spId).subscribe(data => {
           if(data) {
               this._webs = [data];
               this.initSites(this._webs, 1);
               this.setInheritance(this._webs, null);               
               this.flatSites = this.flattenSites(this._webs, []);
               this.flats.next(this.flatSites);
               this.webs.next(this._webs);
               console.info("X: " + console.info(this._webs));
           }
        });

        return this.webs.asObservable();
    }

    ClearAttestationSite(){
        this.webs.next(null);
        this.flats.next(null);
        this.attestationUsers.next(null);
    }

    GetUserByNameSearch(term: string){

        return this.spApi.getUserByNameSearch(term).map(data => {
            return data;
        });

    }

    GetWebHierarchy(): Observable<Web[]> {
        if(!this._webs){
            return this.GetWebHierarchyByWebUrl('http://brenttest.com/root/sub2');
        }else{
            return this.webs.asObservable();
        }
    }

    // GetWebHierarchyBySiteSpId(siteSpId: string): Observable<Web[]> {
    //     if(!this._webs){
    //         return this.GetWebHierarchyBySiteSpId(siteSpId);
    //     }else{
    //         return this.webs.asObservable();
    //     }
    //}

    getSite<T>(): Observable<Web[]> {
        //this._users = users;
        this.siteUsers.next(this._users);

        this.GetWebHierarchyByWebUrl('http://brenttest.com/root/sub2').subscribe(w => {
            if(w){
                this.initSites(w, 1);
                this.setInheritance(w, null);
                this.webs.next(w);
                this.flatSites = this.flattenSites(w, []);
                this.flats.next(this.flatSites);
                console.info("W: " + w);
            }
        });
        // this.initSites(Sites, 1);
        // this.setInheritance(Sites, null);
        // this.site.next(Sites);
        // this.flatSites = this.flattenSites(Sites, []);
        // this.flats.next(this.flatSites);
        console.info(this.flatSites);
        return this.webs.asObservable();
    }

    SaveUser(user: AttestationUser){
        let selectedUser = this._attestationUsers.find(u => u.Role === user.Role);
        selectedUser.User.LoginName = user.User.LoginName;
        selectedUser.User.DisplayName = user.User.DisplayName;
        selectedUser.Status = SiteUserStatus.Nominated;
        selectedUser.NominatedDate = new Date();
        this.attestationUsers.next(this._attestationUsers);
        //console.info("USERS: " + console.info(users));
    }

    ConfirmUser(user: AttestationUser){
        let selectedUser = this._attestationUsers.find(u => u.Role === user.Role);
        selectedUser.Status = SiteUserStatus.Confirmed;
        selectedUser.ConfirmedDate = new Date();
        this.attestationUsers.next(this._attestationUsers);
    }
    
    DeleteUser(user: AttestationUser){
        let selectedUser = this._attestationUsers.find(u => u.Role === user.Role);
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
        
        this.attestationUsers.next(this._attestationUsers);
    }

    getSiteById<T>(siteId: number): Observable<Web> {
        if(this.flats){
            return this.flats.map(s => s.find(x => x.ID === siteId));
        }        
    }

    getSiteUsersBySiteId(siteId: number, roleId: number): Observable<AttestationUser> {
        // this.siteUsers.next(users);
        // return this.siteUsers;
        return this.attestationUsers.map(u => u.find(x => x.Role === roleId));
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
          s.isVisible = true;
          s.isOpen = true;

          if(level === 1){         
            s.InheritOwnerAdmins = false;
            s.displayUrl = s.Url;
          }else{
            let urlParts = s.Url.split('/');
            s.displayUrl = "/" + urlParts[urlParts.length - 1];
          }
    
        //   if(level === 2){
        //     s.isOpen = false;
        //   }else{
        //     s.isOpen = true;
        //   }


          if(s.SubSites){              
              this.initSites(s.SubSites, level + 1);
          }
        });
      }
    
    setInheritance(sites, inheritFromSiteId){
        sites.forEach(s => {
            if(!inheritFromSiteId){
                s.InheritFromSiteId = s.ID
            }
            if(s.InheritOwnerAdmins){
                s.InheritFromSiteId = inheritFromSiteId;
            }else{
                s.InheritFromSiteId = s.ID
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