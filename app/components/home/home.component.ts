import {Component, OnInit} from "@angular/core";
import dataUsers from "../../services/data/dataUsers";
import dataTrips from "../../services/data/dataTrips";

export interface User {
    username: any;
    photo: any;
    mail: any;
    phone: any;
    carType: any;
    experience: any;
}

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: [ 'home.component.css']
})

export class HomeComponent implements OnInit{
    trip: any;
    users: User[];
    selectedUser: User;

    displayDialog: boolean;
    numberOfResultTrips: number;

    minDate: Date;
    maxDate: Date;
    date: Date;

    tripFrom: string;
    tripTo: string;

    range: number[] = [0,100];

    Junior: string;
    Senior: string;
    God: string;

    Standard: string;
    Premium: string;
    Luxury: string;

    ngOnInit(): void {
        this.trip = dataTrips[0];
        this.tripFrom = this.trip.from;
        this.tripTo = this.trip.to;
        this.numberOfResultTrips = dataUsers.length;
        this.users = dataUsers;

        let today = new Date();
        let month = today.getMonth();
        let prevMonth = (month === 0) ? 11 : month -1;
        let nextMonth = (month === 11) ? 0 : month + 1;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
    }

    selectUser(user: User) {
        this.selectedUser = user;
        this.displayDialog = true;
    }

    onDialogHide() {
        this.selectedUser = null;
    }

    reverseDestination() {
        let key = this.tripFrom;
        this.tripFrom = this.tripTo;
        this.tripTo = key;
    }
}
