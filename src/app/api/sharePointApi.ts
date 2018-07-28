import { Injectable } from '@angular/core';
import { Response, RequestOptions, RequestOptionsArgs, Http, Headers, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpInterceptor } from './interceptor';
import 'rxjs/add/operator/map';
import { constants } from './../constants';
import { AttestationUser } from './../user'
import { SiteUserStatus, SiteRole } from './../enums';

@Injectable()
export class SharePointApi {
  constructor (
    private http: HttpInterceptor,
    private http2: HttpClient
  ) {}

  getUser() {
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.get(constants.sharePointApiRootUrl + '/sharepoint/user', requestOptions)
    .map((res:Response) => res.json());
  }

  getUserByNameSearch(term){
    //http://sharepointapi-test.mhars1.optum.com/v1/sharepoint/user/search/asp
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.get(constants.sharePointApiRootUrl + '/sharepoint/user/search/' + term, requestOptions)
    .map((res:Response) => res.json());
  }

  GetWebHierarchyByWebUrl(url: string){
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.get(constants.sharePointApiRootUrl + `/sharepoint/webhierarchy?url=${url}`, requestOptions)
    .map((res:Response) => res.json());
  }

  GetWebHierarchyBySiteSpId(spId: string){
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.get(constants.sharePointApiRootUrl + `/sharepoint/webhierarchy/${spId}`, requestOptions)
    .map((res:Response) => res.json());
  }

  GetSiteCollectionBySiteSpId(spId: string){
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.get(constants.sharePointApiRootUrl + `/sharepoint/sitecollection/${spId}`, requestOptions)
    .map((res:Response) => res.json());
  }

  GetSiteCollectionByUrl(url: string){
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.get(constants.sharePointApiRootUrl + `/sharepoint/sitecollection?url=${url}`, requestOptions)
    .map((res:Response) => res.json());
  }

  GetActiveWorkflow(url: string){
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.get(constants.sharePointApiRootUrl + `/sharepoint/ActiveWorkflow?url=${url}`, requestOptions)
    .map((res:Response) => res.json());
  }

  GetAttestationHistory(spSiteCollectionId: number, roleId: number){
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.get(constants.sharePointApiRootUrl + `/sharepoint/attestationhistory/${spSiteCollectionId}/${roleId}`, requestOptions)
    .map((res:Response) => res.json());
  }

  GetMySites(){
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.get(constants.sharePointApiRootUrl + `/sharepoint/mysites`, requestOptions)
    .map((res:Response) => res.json());
  }

  GetAttestationUsersBySiteId(id: number){
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.get(constants.sharePointApiRootUrl + `/sharepoint/SiteCollectionAttestationUsers/${id}`, requestOptions)
    .map((res:Response) => res.json());
  }

  GetSiteCollectionWorkflowItems(spSiteCollectionId: number){
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.get(constants.sharePointApiRootUrl + `/sharepoint/sitecollectionworkflows/${spSiteCollectionId}`, requestOptions)
    .map((res:Response) => res.json());
  }

  SaveAttestationUser(user: AttestationUser){
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    }); 

    let options = { withCredentials: true, headers: httpHeaders };

    let url = `${constants.sharePointApiRootUrl}/sharepoint/SaveAttestationUser`;
    return this.http2.post(url, user, options);
  }

  DeleteAttestationUser(id: number){
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.delete(constants.sharePointApiRootUrl + `/sharepoint/DeleteAttestationUser/${id}`, requestOptions);
  }

  ConfirmAttestationUser(id: number){
    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
    return this.http.put(constants.sharePointApiRootUrl + `/sharepoint/ConfirmAttestationUser/${id}`, null, requestOptions);
  }
}