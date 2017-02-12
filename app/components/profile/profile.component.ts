import {Component, OnInit} from "@angular/core";
import dataCountries from "../../services/data/dataCountries";
import {Http} from "@angular/http";
import {AuthenticationService} from "../../services/utils/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: [ 'profile.component.css']
})

export class ProfileComponent implements OnInit{

    constructor(private http: Http) {}

    price: number;
    seatNumber: number;
    showErrorCountryTo: boolean = false;
    showErrorCountryFrom: boolean = false;
    showErrorDate: boolean = false;
    showErrorPrice: boolean = false;
    showErrorSeatNumber: boolean = false;

    minDate: Date;
    maxDate: Date;
    date: Date;

    countryTo: string;
    countryFrom: string;
    filteredCountriesSingle: string[];

    userData: Object = {};
    photo: string;

    ngOnInit(): void {
        this.getUserData();

        this.setDate();
    }

    getUserData() {

        let self = this;
        this.http.get("http://localhost:4000/users/" + AuthenticationService.getUserCredentials().id)
            .toPromise()
            .then(res => {
                self.userData = res.json();
                self.photo = res.json().gender;
            })
            .catch(res => {
                if (res.status === 422) {
                    alert(res.statusText);
                }
            });
    }

    addTrip() {
        if (!this.userData['car_type'] || !this.userData['car_type']) {
            alert('To add trip, please enter your car type and driving level');
            return;
        }

        this.showErrorCountryFrom = !this.countryFrom;
        this.showErrorCountryTo = !this.countryTo;
        this.showErrorDate = !this.date;
        this.showErrorPrice = !this.price;
        this.showErrorSeatNumber = !this.seatNumber;

        if (!this.price || !this.seatNumber || !this.countryFrom || !this.countryTo || !this.date) {
            return;
        }

        let data = {
            trip: {
                'user_id': AuthenticationService.getUserCredentials().id,
                'from': this.countryFrom,
                'to': this.countryTo,
                'date': this.date,
                'price': this.price,
                'number_of_seats': this.seatNumber
            }
        };

        // this.http.post("http://localhost:4000/trips/", data)
        //     .toPromise()
        //     .then(res => {
        //         AuthenticationService.login(res.json().name, res.json().id);
        //         this.router.navigate(['/search']);
        //     })
        //     .catch(res => {
        //         if (res.status === 422) {
        //             this.showErrorRegistration = res.json().name[0];
        //         }
        //     });
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

    setDate() {
        let today = new Date();
        let month = today.getMonth();
        let prevMonth = (month === 0) ? 11 : month -1;
        let nextMonth = (month === 11) ? 0 : month + 1;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
    }
}