import {Component, OnInit} from "@angular/core";
import dataCountries from "../../services/data/dataCountries";
import {Http} from "@angular/http";
import {AuthenticationService} from "../../services/utils/authentication.service";
import {ConfirmationService} from "primeng/components/common/api";
import {TranslateService} from "ng2-translate";

export interface Trip {
    id: any;
    from: any;
    to: any;
    date: any;
    price: any;
    carType: any;
    numberOfSeats: any;
    experience: any;
}

@Component({
    moduleId: module.id,
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: [ 'profile.component.css']
})

export class ProfileComponent implements OnInit{

    constructor(private http: Http, private confirmationService: ConfirmationService, private translateService: TranslateService) {}

    price: number;
    seatNumber: number;
    carType: string;
    experience: string;

    id: number;

    password: string;
    repeatPassword: string;
    age: number;
    mail: string;
    phone: number;

    showErrorCountryTo: boolean = false;
    showErrorCountryFrom: boolean = false;
    showErrorDate: boolean = false;
    showErrorPrice: boolean = false;
    showErrorSeatNumber: boolean = false;
    showErrorCarType: boolean = false;
    showErrorExperience: boolean = false;

    showErrorAge: boolean = false;
    showErrorMail: boolean = false;
    showErrorPhone: boolean = false;
    showErrorRegistration: string;

    minDate: Date;
    maxDate: Date;
    date: Date;

    countryTo: string;
    countryFrom: string;
    filteredCountriesSingle: string[];

    userData: Object = {};
    photo: string;

    display: boolean = false;

    cars: Array<Object>;
    levels: Array<Object>;

    addedTrips: Trip[] = [];
    bookedTrips: Array<any> = [];

    ngOnInit(): void {

        this.cars = [
            {type: this.translateService.instant('standard')},
            {type: this.translateService.instant('premium')},
            {type: this.translateService.instant('luxury')}
        ];

        this.levels = [
            {type: this.translateService.instant('junior')},
            {type: this.translateService.instant('senior')},
            {type: this.translateService.instant('expert')}
        ];

        this.carType = this.cars[0]['type'];
        this.experience = this.levels[0]['type'];

        this.getUserData();
        this.getUserTrips();
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
                alert(res.statusText);
            });
    }

    getUserTrips() {
        this.http.get("http://localhost:4000/trips/" + + AuthenticationService.getUserCredentials().id)
            .toPromise()
            .then(res => {
                this.addedTrips = res.json();
                console.log(res.json());
            })
            .catch(res => {
                alert(res.statusText);
            });
    }

    addTrip() {
        this.showErrorCountryFrom = !this.countryFrom;
        this.showErrorCountryTo = !this.countryTo;
        this.showErrorDate = !this.date;
        this.showErrorPrice = !this.price;
        this.showErrorSeatNumber = !this.seatNumber;
        this.showErrorCarType = !this.carType;
        this.showErrorExperience = !this.experience;

        if (!this.price || !this.seatNumber || !this.countryFrom || !this.countryTo || !this.date || !this.carType || !this.experience) {
            return;
        }

        let data = {
            trip: {
                'user_id': AuthenticationService.getUserCredentials().id,
                'from': this.countryFrom['name'],
                'to': this.countryTo['name'],
                'date': this.date,
                'price': this.price,
                'number_of_seats': this.seatNumber,
                'car_type': this.carType,
                'drive_level': this.experience
            }
        };


        this.http.post("http://localhost:4000/trips/", data)
            .toPromise()
            .then(res => {
                this.addedTrips.push(res.json());
            })
            .catch(res => {
                alert(res.statusText);
            });
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

    openEditProfile() {
        this.display = true;
        this.age = this.userData['age'];
        this.mail = this.userData['email'];
        this.phone = this.userData['phone'];
    }

    updateProfile() {

        this.showErrorAge = !this.age;
        this.showErrorMail = !this.mail;
        this.showErrorPhone = !this.phone;

        if (!this.age || !this.mail || !this.phone) {
            return;
        }

        let data = {
            user: {
                'age': this.age,
                'email': this.mail,
                'phone': this.phone
            }
        };

        this.http.put("http://localhost:4000/users/" + AuthenticationService.getUserCredentials().id, data)
            .toPromise()
            .then(res => {
                this.userData = res.json();
                console.log(res.json());
                this.display = false;
            })
            .catch(res => {
                if (res.status === 422) {
                    this.showErrorRegistration = res.json().name[0];
                }
            });
    }

    deleteProfile() {
        this.confirmationService.confirm({
            message: this.translateService.instant('deleteProfileMessage'),
            header: this.translateService.instant('deleteProfileConfirmation'),
            icon: 'fa fa-trash',
            accept: () => {
                this.http.delete("http://localhost:4000/users/" + AuthenticationService.getUserCredentials().id)
                    .toPromise()
                    .then(() => {
                        AuthenticationService.logout();
                    })
                    .catch(res => {
                        alert(res.status);
                    });
            }
        });
    }

    deleteTrip(trip: Trip) {
        let self = this;
        this.confirmationService.confirm({
            message: this.translateService.instant('deleteTripMessage'),
            header: this.translateService.instant('deleteTripConfirmation'),
            icon: 'fa fa-trash',
            accept: () => {
                self.http.delete("http://localhost:4000/trips/" + trip.id)
                    .toPromise()
                    .then(() => {
                        self.getUserTrips();
                    })
                    .catch(res => {
                        alert(res.status);
                    });
            }
        });
    }
}