import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { User } from './user';
import { Site } from './site';
import { SharePointApi } from './api/sharePointApi';
import { Sites } from './mock-sites';
import { AttestationUser } from './user';
// import { users } from './mock-users';
import { SiteUserStatus, SiteRole } from './enums';
import { Web, SiteAttestation } from './site';

@Injectable()
export class AppService{
    private sites;
    private flatSites;
    private _siteCollection;
    private _users;
    private _webs;
    private _loggedInUser;
    private _attestationUsers;
    private _activeTabIndex;
    private _myMessagesCount: number = 0;
    private _contextSiteCollectionSpId;
    private _mySites;
    private _lastSiteLoadedSpId;
    private _attestationHistory;
    private _attestationWorkflow;
    private _siteCollectionWorkflowItems;
    private _siteAttestation: SiteAttestation;
    private _admins: string[];
    private _siteCollectionReport;
    private _siteComplianceData;

    constructor(private spApi: SharePointApi){

    }

    private siteCollection = new BehaviorSubject(null);
    private site = new BehaviorSubject(null);
    private flats = new BehaviorSubject<Web[]>(null);
    private siteUsers = new BehaviorSubject<AttestationUser[]>(null);
    private loggedInUser = new BehaviorSubject<User>(null);
    private webs = new BehaviorSubject<Web[]>(null);
    public attestationUsers = new BehaviorSubject<AttestationUser[]>(null);
    public myMessagesCount = new BehaviorSubject<number>(this._myMessagesCount);
    public contextSiteCollectionSpId = new Subject<string>();
    private mySites = new BehaviorSubject<AttestationUser[]>(null);
    private lastSiteLoadedSpId = new BehaviorSubject<string>(null);
    public siteAttestation = new Subject<SiteAttestation>();
    public attestationHistory = new BehaviorSubject<any[]>(null);
    public attestationWorkflow = new BehaviorSubject<any>(null);
    public siteCollectionWorkflowItems = new BehaviorSubject<any>(null);
    public admins = new BehaviorSubject<string[]>(null);
    public siteCollectionReport = new BehaviorSubject<any>(null);
    public siteComplianceData = new BehaviorSubject<any>(null);

    GetSiteCollectionWorkflowItems(){
        let spSiteCollectionId;

        if(this._siteAttestation){
            spSiteCollectionId = this._siteAttestation.Site.SiteID;

            this.spApi.GetSiteCollectionWorkflowItems(spSiteCollectionId).subscribe(data => {
                if(data){
                    this._siteCollectionWorkflowItems = data;
                    this.siteCollectionWorkflowItems.next(this._siteCollectionWorkflowItems);
                }
            });            
        }
        return this.siteCollectionWorkflowItems.asObservable();
    }

    GetLastSiteLoadedSPID(){
        return this._lastSiteLoadedSpId;
    }

    GetSiteAttestation(siteSpId: string): Observable<SiteAttestation> {
        this._siteAttestation = new SiteAttestation;
        this.spApi.GetSiteCollectionBySiteSpId(siteSpId).subscribe(data => {        
            if(data) {
                this._lastSiteLoadedSpId = data.SPID;
                this.lastSiteLoadedSpId.next(this._lastSiteLoadedSpId);
                this._siteCollection = data;
                this._siteAttestation.Site = new Site;
                this._siteAttestation.Site.SiteID = data.ID;
                this._siteAttestation.Hierarchy = [data.Webs];
                this.initSites(this._siteAttestation.Hierarchy, 1);
                this.setInheritance(this._siteAttestation.Hierarchy, null);
                this._siteAttestation.FlatSites = this.flattenSites(this._siteAttestation.Hierarchy, []);
                             
                this.spApi.GetActiveWorkflow(data.Url).subscribe(workflow => {
                    if(workflow){
                        this._siteAttestation.ActiveWorkflow = workflow;                        
                    }

                    this.spApi.GetAttestationUsersBySiteId(data.ID).subscribe(users => {
                        if(users){
                            this._siteAttestation.AttestationUsers = users;
                        }
                        this.siteAttestation.next(this._siteAttestation);   
                    });
                });
            }
         });
         
         return this.siteAttestation.asObservable();
    }

    GetSiteCollectionAttestationStatus(): SiteUserStatus {
        let status = SiteUserStatus.Confirmed;

        this._siteAttestation.AttestationUsers.forEach(u => {
            if(u.Status == SiteUserStatus.NotSelected || u.Status == SiteUserStatus.Nominated){
                status = SiteUserStatus.NotSelected;
                return status;
            }
            if(u.Status == SiteUserStatus.Invalid){
                status = SiteUserStatus.Invalid;
                return status;
            }
        });
        return status;
    }

    GetAllComplianceData(spSiteCollectionId: number){
        this.spApi.GetAllComplianceDetails(spSiteCollectionId).subscribe(data => {
            if(data){
                this._siteComplianceData = data;
                this.siteComplianceData.next(this._siteComplianceData);
            }
        });
        
        return this.siteComplianceData.asObservable();
    }

    GetSiteAttestationByUrl(url: string): Observable<SiteAttestation> {        
        this._siteAttestation = new SiteAttestation;
        this.spApi.GetSiteCollectionByUrl(url).subscribe(data => {        
            if(data && data.Url) {
                this._lastSiteLoadedSpId = data.SPID;
                this.lastSiteLoadedSpId.next(this._lastSiteLoadedSpId);
                this._siteCollection = data;
                this._siteAttestation.Site = new Site;
                this._siteAttestation.Site.SiteID = data.ID;
                this._siteAttestation.Hierarchy = [data.Webs];
                this.initSites(this._siteAttestation.Hierarchy, 1);
                this.setInheritance(this._siteAttestation.Hierarchy, null);
                this._siteAttestation.FlatSites = this.flattenSites(this._siteAttestation.Hierarchy, []);
                             
                this.spApi.GetActiveWorkflow(data.Url).subscribe(workflow => {
                    if(workflow){
                        this._siteAttestation.ActiveWorkflow = workflow;                        
                    }

                    this.spApi.GetAttestationUsersBySiteId(data.ID).subscribe(users => {
                        if(users){
                            this._siteAttestation.AttestationUsers = users;
                        }
                        this.siteAttestation.next(this._siteAttestation);   
                    });
                });
                                
            }else{
                this.siteAttestation.next(null);
            }
            });
            
            return this.siteAttestation.asObservable();
    }

    GetAttestationHistory(spSiteCollectionId, roleId){
        this.spApi.GetAttestationHistory(spSiteCollectionId, roleId).subscribe(data => {
            if(data){
                this._attestationHistory = data;
                this.attestationHistory.next(this._attestationHistory);
            }
        });
        return this.attestationHistory.asObservable();
    }

    GetSiteCollectionReport(){
        this.spApi.GetSiteCollectionReport().subscribe(data => {
            if(data){
                this._siteCollectionReport = data;
                this.siteCollectionReport.next(this._siteCollectionReport);
            }
        });
        return this.siteCollectionReport.asObservable();
    }
    
    GetAdmins(){
        this.spApi.GetAdmins().subscribe(data => {
            if(data){
                this._admins = data;
                this.admins.next(this._admins);
            }
        });
        return this.admins.asObservable();
    }

    GetSiteRoleNameByRoleID(roleId: number){
        let roleName = null;

        switch(roleId){
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
            case 5:
            roleName = "Optional Administrator";              
            break;                 
          }

        return roleName;
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
        if(!this._loggedInUser){
            let user = new User;
            this._loggedInUser = user;
            this.spApi.getUser().subscribe(data => {
                if(data){
                    user.FirstName = data.FirstName;
                    user.LastName = data.LastName;
                    user.DisplayName = user.FirstName + ' ' + user.LastName;
                    user.LoginName = data.LoginName;
                    user.IsAdmin = data.IsAdmin;
                    this._loggedInUser = user;
                    this.loggedInUser.next(this._loggedInUser);
                }                
            });      
        }

        return this.loggedInUser.asObservable();
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

    GetUsersBySearchTerm(term: string){
        //http://sharepointapi-test.mhars1.optum.com/v1/sharepoint/user/search/brochh
    }

    FormatDate(date, includeTime) {
        var formattedDate = "-";
        if (date) {
            date = new Date(date);
            if (date instanceof Date && !isNaN(date.valueOf())) {
                var hours = date.getHours();
                var minutes: number = date.getMinutes();
                var ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? 0 + minutes : minutes;
                var mins = minutes.toString();
                if(mins.length === 1){
                    mins = "0" + mins;
                }
                var strTime = hours + ':' + mins + ' ' + ampm;
                if(includeTime){
                    formattedDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
                }else{
                    formattedDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
                }
                
            }
        }
        return formattedDate;
    }

    GetAttestationUserByRoleID(roleId: number): AttestationUser{
        return this._siteAttestation.AttestationUsers.find(user => user.Role === roleId)
    }

    DeleteAttestationUser(id: number){
        return this.spApi.DeleteAttestationUser(id);
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

    GetMySites(){
        //if(!this._mySites){
            this.spApi.GetMySites().subscribe(sites => {
                if(sites){
                    this._mySites = sites;
                    this.mySites.next(this._mySites);
                }
            });
        //}

        return this.mySites.asObservable();
    }

    getLoggedInUserApi(): Observable<User> {
        let user = new User;
        
        this.spApi.getUser().subscribe(data => {
            if(data){
                user.FirstName = data.FirstName;
                user.LastName = data.LastName;
                user.DisplayName = user.FirstName + ' ' + user.LastName;
                user.LoginName = data.LoginName;
                user.IsAdmin = data.IsAdmin;
                this._loggedInUser = user;
                this.loggedInUser.next(this._loggedInUser);
            }
        });
        
        return this.loggedInUser.asObservable();
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
        //if(term)
        return this.spApi.GetUserByNameSearch(term).map(data => {
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
        console.info(this.flatSites);
        return this.webs.asObservable();
    }

    SaveUser(user: AttestationUser){        
        let selectedUser = this._siteAttestation.AttestationUsers.find(u => u.Role === user.Role);
        selectedUser.SPSiteCollectionID = this._siteCollection.ID;
        selectedUser.Url = this._siteCollection.Url;
        this.spApi.SaveAttestationUser(selectedUser).subscribe(response => {
            //let id = parseInt(response);
            selectedUser.ID = <number>response;
            console.info("RESPONSE: " + response);
        });

        selectedUser.User.DisplayName = user.User.DisplayName;
        selectedUser.NominatedByLoginName = this._loggedInUser.LoginName;
        selectedUser.NominatedByDisplayName = this._loggedInUser.DisplayName;
        selectedUser.Status = SiteUserStatus.Nominated;
        selectedUser.NominatedDate = new Date();

        this.siteAttestation.next(this._siteAttestation);        
    }

    SaveWorkflowInstanceItem(item){
        this.spApi.SaveWorkflowItem(item).subscribe(response => {
            console.info("SAVED");
        });
    }

    SaveAdmin(loginName: string){
        this.spApi.SaveAdmin(loginName).subscribe(response => {
            //if(response){
                this.GetAdmins();
            //}
        });
    }

    DeleteAdmin(loginName: string){
        this.spApi.DeleteAdmin(loginName).subscribe(response => {
            this.GetAdmins();
        });
    }

    ConfirmUser(user: AttestationUser){
        let selectedUser = this._siteAttestation.AttestationUsers.find(u => u.Role === user.Role);
        this.spApi.ConfirmAttestationUser(selectedUser.ID).subscribe(d => {
            selectedUser.Status = SiteUserStatus.Confirmed;
            selectedUser.ConfirmedDate = new Date();
            this.siteAttestation.next(this._siteAttestation);
        });
        //this.spApi.XX().subscribe(x=>{});
    }
    
    DeleteUser(user: AttestationUser){
        let selectedUser = this._siteAttestation.AttestationUsers.find(u => u.Role === user.Role);
        this.spApi.DeleteAttestationUser(user.ID).subscribe(d => {            
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
        });
        this.siteAttestation.next(this._siteAttestation);
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
          s.isVisible = false;
          s.isOpen = true;

          if(level === 1){         
            s.InheritOwnerAdmins = false;
            s.displayUrl = s.Url;
            s.isOpen = false;
            s.isVisible = true;
          }else{
            let urlParts = s.Url.split('/');
            s.displayUrl = "/" + urlParts[urlParts.length - 1];
          }

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