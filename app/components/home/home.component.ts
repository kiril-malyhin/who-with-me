import {Component, OnInit} from "@angular/core";
import dataUsers from "../../services/data/dataUsers";
import dataTrips from "../../services/data/dataTrips";
import {SearchService} from "../../services/utils/search.service";
import {isUndefined} from "util";

export interface User {
    name: any;
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
    sortedTrips: Array<any> = [];
    users: User[];
    selectedUser: User;

    displayDialog: boolean;
    numberOfResultTrips: number = 0;

    minDate: Date;
    maxDate: Date;
    date: Date;

    tripFrom: string;
    tripTo: string;

    minPrice: number = 1;
    maxPrice: number = 50;

    minTime: number = 1;
    maxTime: number = 24;

    rangeTime: number[] = [this.minTime, this.maxTime];
    rangePrice: number[] = [this.minPrice, this.maxPrice];

    experience: string = 'NoMatterExperience';
    carType: string = 'NoMatterCarType';

    value: number = 0;

    ngOnInit(): void {
        let interval = setInterval(() => {
            this.value += 49;
            if(this.value >= 100) {
                this.value = 100;
                clearInterval(interval);
            }
        }, 1000);

        this.tripFrom = SearchService.getParameters().destinationFrom;
        this.tripTo = SearchService.getParameters().destinationTo;
        this.date = SearchService.getParameters().destinationDate;

        this.trip = dataTrips;
        this.find();

        this.users = dataUsers;

        this.numberOfResultTrips = this.users.length;

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

    find() {
        let self = this;
        this.trip.forEach(function(item: any) {
            if (self.tripFrom === item.from && self.tripTo === item.to && self.date === item.date) {
                self.sortedTrips.push(item);
            }
        });
        return this.sortedTrips;
    }

    sort() {
        let filters = {};
        if(this.carType !== 'NoMatterCarType')
            filters['carType'] = this.carType;
        if(this.experience !== 'NoMatterExperience')
            filters['experience'] = this.experience;
        let result = dataUsers.filter(user => {
            for (let key in filters) {
                if (!(filters[key] === user[key])) return false;
            }
            return true;
        });

        this.users = result;
        this.numberOfResultTrips = result.length;
    }
}
