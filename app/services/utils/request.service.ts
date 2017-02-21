import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AuthenticationService} from "./authentication.service";

const serverUrl = "http://localhost:4000/";

@Injectable()
export class RequestService {

    constructor(public http: Http) {}

    public userAuth = (data: Object) => {
        return this.http.post(serverUrl + "user_auth", data);
    };

    public createUser = (data: Object) => {
        return this.http.post(serverUrl + "users/", data);
    };

    public getUser = () => {
        return this.http.get(serverUrl + "users");
    };

    public updateUser = (data: Object) => {
        return this.http.put(serverUrl + "users/" + AuthenticationService.getUserCredentials().id, data);
    };

    public deleteUser = () => {
        return this.http.delete(serverUrl + "users/" + AuthenticationService.getUserCredentials().id);
    };

    public getCurrentUser = () => {
        return this.http.get(serverUrl + "users/" + AuthenticationService.getUserCredentials().id);
    };

    public createTrip = (data: Object) => {
        return this.http.post(serverUrl + "trips/", data);
    };

    public findTrip = (data: Object) => {
        return this.http.post(serverUrl + "find_trip", data);
    };

    public deleteTrip = (data: Object) => {
        return this.http.delete(serverUrl + "trips/" + data);
    };

    public getAddedTrips = () => {
        return this.http.get(serverUrl + "trips/" + AuthenticationService.getUserCredentials().id);
    };

    public getBookedTrips = () => {
        return this.http.get(serverUrl + "books/" + AuthenticationService.getUserCredentials().id);
    };

    public bookSeat = (data: Object) => {
        return this.http.post(serverUrl + "books/", data);
    };

}

