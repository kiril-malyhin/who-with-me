import {Component, OnInit} from "@angular/core";
import dataCountries from "../../services/json/dataCountries";
import dataUsers from "../../services/json/dataUsers";

@Component({
    moduleId: module.id,
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: [ 'profile.component.css']
})

export class ProfileComponent implements OnInit{
    showErrorPrice: boolean = false;
    showErrorSeatNumber: boolean = false;
    price: number;
    seatNumber: number;

    minDate: Date;
    maxDate: Date;
    date: Date;

    countryTo: string;
    countryFrom: string;
    filteredCountriesSingle: string[];

    userData = dataUsers[0];

    ngOnInit(): void {

        let today = new Date();
        let month = today.getMonth();
        let prevMonth = (month === 0) ? 11 : month -1;
        let nextMonth = (month === 11) ? 0 : month + 1;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
    }

    addTrip() {

        this.showErrorPrice = !this.price;
        this.showErrorSeatNumber = !this.seatNumber;


        if (!this.price || !this.seatNumber) {
            return;
        }
    }

    filterCountrySingle(event: any) {
        let query = event.query;
        this.filteredCountriesSingle = this.filterCountry(query, dataCountries);
    }

    filterCountry(query: string, countries: any[]):any[] {
        let filtered : any[] = [];
        for(let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }
}