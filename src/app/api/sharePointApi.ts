import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { HttpInterceptor } from './interceptor';
import 'rxjs/add/operator/map';
import { constants } from './../constants';

@Injectable()
export class SharePointApi {
  constructor (
    private http: HttpInterceptor
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
}