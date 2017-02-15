import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AuthenticationService} from "./authentication.service";


@Injectable()
export class RequestService {

    constructor(public http: Http) {}

    public userAuth = (data: Object) => {
        return this.http.post("http://localhost:4000/user_auth", data);
    };

    public createUser = (data: Object) => {
        return this.http.post("http://localhost:4000/users/", data);
    };

    public getUser = () => {
        return this.http.get("http://localhost:4000/users");
    };

    public updateUser = (data: Object) => {
        return this.http.put("http://localhost:4000/users/" + AuthenticationService.getUserCredentials().id, data);
    };

    public deleteUser = () => {
        return this.http.delete("http://localhost:4000/users/" + AuthenticationService.getUserCredentials().id);
    };

    public getCurrentUser = () => {
        return this.http.get("http://localhost:4000/users/" + AuthenticationService.getUserCredentials().id);
    };

    public createTrip = (data: Object) => {
        return this.http.post("http://localhost:4000/trips/", data);
    };

    public deleteTrip = (data: Object) => {
        return this.http.delete("http://localhost:4000/trips/" + data);
    };

    public getAddedTrips = () => {
        return this.http.get("http://localhost:4000/trips/" + AuthenticationService.getUserCredentials().id);
    };



}

