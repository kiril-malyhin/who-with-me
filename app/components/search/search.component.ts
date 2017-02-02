import {Component, OnInit} from "@angular/core";
import dataCountries from "../../services/utils/dataCountries";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'search.component.html',
    styleUrls: [ 'search.component.css' ]
})

export class SearchComponent implements OnInit{

    constructor(private router: Router) {

    }

    minDate: Date;
    maxDate: Date;
    dateTo: Date;

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

    countryTo: string;
    countryFrom: string;
    filteredCountriesSingle: string[];
    filteredCountriesMultiple: string[];

    filterCountrySingle(event: any) {
        let query = event.query;
        this.filteredCountriesSingle = this.filterCountry(query, dataCountries);
    }

    filterCountryMultiple(event: any) {
        let query = event.query;
        this.filteredCountriesMultiple = this.filterCountry(query, dataCountries);

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

    findTrip() {
        this.router.navigate(['/home']);
    }

}

