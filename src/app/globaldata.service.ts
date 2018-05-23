import { Injectable } from '@angular/core';

@Injectable()
export class AppService{
    private sites;
    private users;

    constructor(){
      //this.sites = [{test: 'test'}];
      //console.log("My intial global variable value is: " + this.myGlobalVar);
    }

    public Users = this.users;

    setSites(val: any[]){
      this.sites = val;
    }

    getSites(){
      return this.sites;
    }

    getSiteBySPId(sites, spId){
        if(!sites){
            sites = this.sites;
        }
        for (let o of this.sites || []) {
            if (o.SiteID == spId) return o
            const o_ = this.getSiteBySPId(o.SubSites, spId);
            if (o_) return o_
          }
    }

    getUsersBySPId(users, spId){
        if(!users){
            users = this.Users;
        }
        return users.filter(u => u.SiteID === spId);
    }
    
    SetUser(user, spId){
        this.Users.push(user);
    }
}