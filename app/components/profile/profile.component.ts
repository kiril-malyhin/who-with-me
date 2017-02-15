import {Component, OnInit} from "@angular/core";
import dataCountries from "../../services/data/dataCountries";
import {AuthenticationService} from "../../services/utils/authentication.service";
import {ConfirmationService} from "primeng/components/common/api";
import {TranslateService} from "ng2-translate";
import {RequestService} from "../../services/utils/request.service";

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

    constructor(private confirmationService: ConfirmationService,
                private translateService: TranslateService,
                private requestService: RequestService) {}

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

    // TODO set datepicker min date
    minDate: Date;
    maxDate: Date;
    dateTo: Date;

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

        let today = new Date();
        let month = today.getMonth();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let nextMonth = (month === 11) ? 0 : month + 1;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);

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
    }

    getUserData() {
        let self = this;
        this.requestService.getCurrentUser()
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
        this.requestService.getAddedTrips()
            .toPromise()
            .then(res => {
                this.addedTrips = res.json();
                console.log(res.json());
            })
            .catch(res => {
                console.log(res.statusText);
            });
    }

    addTrip() {
        this.showErrorCountryFrom = !this.countryFrom;
        this.showErrorCountryTo = !this.countryTo;
        this.showErrorDate = !this.dateTo;
        this.showErrorPrice = !this.price;
        this.showErrorSeatNumber = !this.seatNumber;
        this.showErrorCarType = !this.carType;
        this.showErrorExperience = !this.experience;

        if (!this.price || !this.seatNumber || !this.countryFrom || !this.countryTo || !this.dateTo || !this.carType || !this.experience) {
            return;
        }

        let data = {
            trip: {
                'user_id': AuthenticationService.getUserCredentials().id,
                'from': this.countryFrom['name'],
                'to': this.countryTo['name'],
                'date': this.dateTo.toString(),
                'price': this.price,
                'number_of_seats': this.seatNumber,
                'car_type': this.carType,
                'drive_level': this.experience
            }
        };

        this.requestService.createTrip(data)
            .toPromise()
            .then(res => {
                this.addedTrips.push(res.json());
            })
            .catch(res => {
                console.log(res.statusText);
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

        this.requestService.updateUser(data)
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
                this.requestService.deleteUser()
                    .toPromise()
                    .then(() => {
                        AuthenticationService.logout();
                    })
                    .catch(res => {
                        console.log(res.status);
                    });
            }
        });
    }

    deleteTrip(trip: Trip) {
        this.confirmationService.confirm({
            message: this.translateService.instant('deleteTripMessage'),
            header: this.translateService.instant('deleteTripConfirmation'),
            icon: 'fa fa-trash',
            accept: () => {
                this.requestService.deleteTrip(trip.id)
                    .toPromise()
                    .then(() => {
                        this.getUserTrips();
                    })
                    .catch(res => {
                        console.log(res.status);
                    });
            }
        });
    }
}