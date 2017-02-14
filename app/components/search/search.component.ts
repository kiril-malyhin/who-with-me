import {Component, OnInit} from "@angular/core";
import dataCountries from "../../services/data/dataCountries";
import {Router} from "@angular/router";
import {SearchService} from "../../services/utils/search.service";

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'search.component.html',
    styleUrls: [ 'search.component.css' ]
})

export class SearchComponent implements OnInit{

    constructor(private router: Router) {

    }

    // TODO set datepicker min date

    minDate: Date;
    maxDate: Date;
    dateTo: Date;

    countryTo: string = '';
    countryFrom: string = '';
    filteredCountriesSingle: string[];
    filteredCountriesMultiple: string[];

    ngOnInit(): void {

        let today = new Date();
        let month = today.getMonth();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let nextMonth = (month === 11) ? 0 : month + 1;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
    }

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
        if (!this.countryFrom['name'] || !this.countryTo['name'] || !this.dateTo) {
            alert('Error! Check input!');
            return;
        } else {
            SearchService.setParameters(this.countryFrom['name'], this.countryTo['name'], this.dateTo);
            this.router.navigate(['/home']);
        }
    }

}

