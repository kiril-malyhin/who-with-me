import {Component, OnInit} from "@angular/core";
import {SearchService} from "../../services/utils/search.service";
import {RequestService} from "../../services/utils/request.service";
import {AuthenticationService} from "../../services/utils/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: [ 'home.component.css']
})

export class HomeComponent implements OnInit{
    resultTrips: Array<any> = [];
    maxNumberOfSeats: number;

    seatNumber: number;
    showErrorSeatNumber: boolean = false;
    showErrorMinSeatNumber: boolean = false;
    showErrorMaxSeatNumber: boolean = false;
    displayReserve: boolean = false;
    displayUpdate: boolean = false;
    displayDelete: boolean = false;

    minDate: Date;
    date: Date;

    countryFrom: string;
    countryTo: string;

    value: number = 0;
    allTrips: Array<any> = [];

    // TODO set min and max price
    minPrice: number = 1;
    maxPrice: number = 100;

    drive_level: string = 'NoMatterExperience';
    car_type: string = 'NoMatterCarType';

    isPaginator: boolean = true;
    photo: string;
    tripId: number;

    reserved_seats_count: number;

    constructor(private requestService: RequestService) {}

    ngOnInit(): void {
        let interval = setInterval(() => {
            this.value += 49;
            if(this.value >= 100) {
                this.value = 100;
                clearInterval(interval);
            }
        }, 1000);

        this.countryFrom = SearchService.getParameters().destinationFrom;
        this.countryTo = SearchService.getParameters().destinationTo;
        this.date = SearchService.getParameters().destinationDate;

        this.getTrips();
    }

    getTrips() {
        let self = this;

        let data = {
            trip: {
                'from': this.countryFrom,
                'to': this.countryTo,
                'date': this.date,
            }
        };
        this.requestService.findTrip(data)
            .toPromise()
            .then(res => {
                self.resultTrips = res.json();
                self.allTrips = res.json();
                if(self.resultTrips.length === 0) this.isPaginator = false;
                console.log(self.resultTrips);
            })
            .catch(res => {
                console.log(res.statusText);
            });
    }

    reserve() {
        this.showErrorMinSeatNumber = false;
        this.showErrorMaxSeatNumber = false;
        this.showErrorSeatNumber = !this.seatNumber;

        if (!this.seatNumber) return;

        console.log(this.reserved_seats_count);
        console.log(this.maxNumberOfSeats);
        if (this.seatNumber > (this.maxNumberOfSeats - this.reserved_seats_count)) {
            this.showErrorMaxSeatNumber = true;
            return;
        } else if (this.seatNumber < 1) {
            this.showErrorMinSeatNumber = true;
            return;
        }
        let data = {
            book: {
                'user_id': AuthenticationService.getUserCredentials().id,
                'trip_id': this.tripId,
                'seats_count': this.seatNumber,
            }
        };

        this.requestService.bookSeatAdd(data)
            .toPromise()
            .then(res => {
                console.log(res);
                this.displayReserve = false;
                this.getTrips();
            })
            .catch(res => {
                console.log(res);
            })
    }

    update() {
        this.showErrorMinSeatNumber = false;
        this.showErrorMaxSeatNumber = false;
        this.showErrorSeatNumber = !this.seatNumber;

        if (!this.seatNumber) return;

        console.log(this.reserved_seats_count);
        console.log(this.maxNumberOfSeats);
        if (this.seatNumber > (this.maxNumberOfSeats - this.reserved_seats_count)) {
            this.showErrorMaxSeatNumber = true;
            return;
        } else if (this.seatNumber < 1) {
            this.showErrorMinSeatNumber = true;
            return;
        }
        let data = {
            book: {
                'user_id': AuthenticationService.getUserCredentials().id,
                'trip_id': this.tripId,
                'seats_count': this.seatNumber,
            }
        };

        this.requestService.bookSeatUpdate(data)
            .toPromise()
            .then(res => {
                console.log(res);
                this.displayUpdate = false;
                this.getTrips();
            })
            .catch(res => {
                console.log(res);
            })
    }

    delete() {
        this.showErrorMinSeatNumber = false;
        this.showErrorMaxSeatNumber = false;
        this.showErrorSeatNumber = !this.seatNumber;

        if (!this.seatNumber) return;

        console.log(this.reserved_seats_count);
        console.log(this.maxNumberOfSeats);
        if (this.seatNumber > (this.maxNumberOfSeats - this.reserved_seats_count)) {
            this.showErrorMaxSeatNumber = true;
            return;
        } else if (this.seatNumber < 1) {
            this.showErrorMinSeatNumber = true;
            return;
        }
        let data = {
            book: {
                'user_id': AuthenticationService.getUserCredentials().id,
                'trip_id': this.tripId,
                'seats_count': this.seatNumber,
            }
        };

        this.requestService.bookSeatDelete(data)
            .toPromise()
            .then(res => {
                console.log(res);
                this.displayDelete = false;
                this.getTrips();
            })
            .catch(res => {
                console.log(res);
            })
    }

    openReserve(trip: any) {
        this.tripId = trip.id;
        this.maxNumberOfSeats = trip.number_of_seats;
        this.reserved_seats_count = trip.reserved_seats;
        this.displayReserve = true;
    }

    openUpdate(trip: any) {
        this.tripId = trip.id;
        this.maxNumberOfSeats = trip.number_of_seats;
        this.reserved_seats_count = trip.reserved_seats;
        this.displayUpdate = true;
    }

    openDelete(trip: any) {
        this.tripId = trip.id;
        this.maxNumberOfSeats = trip.number_of_seats;
        this.reserved_seats_count = trip.reserved_seats;
        this.displayDelete = true;
    }

    sort() {
        let filters = {};
        if(this.car_type !== 'NoMatterCarType')
            filters['car_type'] = this.car_type;
        if(this.drive_level !== 'NoMatterExperience')
            filters['drive_level'] = this.drive_level;
        this.resultTrips = this.allTrips.filter(user => {
            for (let key in filters) {
                if (!(filters[key] === user[key])) return false;
            }
            return true;
        });
        if(this.resultTrips.length === 0) this.isPaginator = false;
    }

    reverseDestination() {
        let key = this.countryFrom;
        this.countryFrom = this.countryTo;
        this.countryTo = key;
    }
}
