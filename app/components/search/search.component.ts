import {Component} from "@angular/core";
import dataCountries from "./dataCountries";

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'search.component.html',
    styleUrls: [ 'search.component.css' ]
})

export class SearchComponent {
    value: Date;

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

}

