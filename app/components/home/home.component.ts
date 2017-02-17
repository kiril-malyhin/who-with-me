import {Component, OnInit} from "@angular/core";
import {SearchService} from "../../services/utils/search.service";
import {RequestService} from "../../services/utils/request.service";

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: [ 'home.component.css']
})

export class HomeComponent implements OnInit{
    // sortedTrips: Array<any> = [];
    resultTrips: Array<any> = [];

    maxNumberOfSeats: number;

    seatNumber: number;
    showErrorSeatNumber: boolean = false;
    showErrorMinSeatNumber: boolean = false;
    showErrorMaxSeatNumber: boolean = false;
    display: boolean = false;

    minDate: Date;
    date: Date;

    countryFrom: string;
    countryTo: string;

    value: number = 0;

    allTrips: Array<any> = [];

    // TODO set min and max price
    minPrice: number = 1;
    maxPrice: number = 100;
    rangePrice: number[] = [this.minPrice, this.maxPrice];

    drive_level: string = 'NoMatterExperience';
    car_type: string = 'NoMatterCarType';

    isPaginator: boolean = true;

    photo: string;

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

                // self.minPrice = Math.min.apply(Math, self.resultTrips.map(function(trip){return trip.price;}));
                // self.maxPrice = Math.max.apply(Math, self.resultTrips.map(function(trip){return trip.price;}));
            })
            .catch(res => {
                console.log(res.statusText);
            });

        // this.trip.forEach(function(item: any) {
        //     if (self.tripFrom === item.from && self.tripTo === item.to && self.date === item.date) {
        //         self.sortedTrips.push(item);
        //     }
        // });
    }

    reserve() {
        this.showErrorMinSeatNumber = false;
        this.showErrorMaxSeatNumber = false;
        this.showErrorSeatNumber = !this.seatNumber;

        if (!this.seatNumber) return;

        if (this.seatNumber > this.maxNumberOfSeats) {
            this.showErrorMaxSeatNumber = true;
            return;
        } else if (this.seatNumber < 1) {
            this.showErrorMinSeatNumber = true;
            return;
        }
    }

    openReserve(maxNumber: number) {
        this.maxNumberOfSeats = maxNumber;
        this.display = true;
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
