import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Rx"
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ErrorDialog } from './errorModal';
// operators
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"

@Injectable()
export class HttpInterceptor extends Http {

    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public http: Http,
        public dialog: MatDialog
    ) {
        super(backend, options);
        options.headers.set('Accept', '*/*');
    }

    public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options)
            .catch(this.handleError)
    }

    public handleError = (error: any) => {                    
        this.dialog.open(ErrorDialog, {
            width: '500px',
            height: '500px',
            data: { message: JSON.parse(error._body).Message }
          });
      
        return Observable.throw(error);
    }
}   