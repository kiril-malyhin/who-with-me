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
    trip: Object;
    users: User[];
    selectedUser: User;

    displayDialog: boolean;
    numberOfResultTrips: number;

    ngOnInit(): void {
        this.trip = dataTrips[0];
        this.numberOfResultTrips = dataUsers.length;
        this.users = dataUsers;
    }

    selectUser(user: User) {
        this.selectedUser = user;
        this.displayDialog = true;
    }

    onDialogHide() {
        this.selectedUser = null;
    }
}
