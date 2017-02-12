import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';


@Injectable()
export class RequestService {

    constructor(public http: Http) {}

    public createUser = (data: Object) => {
        this.http.post("http::/localhost:4000/users", data, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };

    public extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    public handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}

const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers: headers });
const serverUrl = "localhost:4000";
