import { Injectable } from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class RequestService {

    constructor(public http: Http) {
    }

    public createUser = (data: Object) => {
        this.http.post("http::/localhost:4000/users", data)
    };
}

