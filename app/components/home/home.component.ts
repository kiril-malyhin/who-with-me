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

    // selectedNumberOfSeats: string;
    // numberOfSeats: Array<any> = [
    //     { label: 'Reserve', value: null},
    //     { label: 1, value: {id: 1}},
    //     { label: 2, value: {id: 2}},
    //     { label: 3, value: {id: 3}},
    //     { label: 4, value: {id: 4}},
    // ];

    seatNumber: number;
    showErrorSeatNumber: boolean = false;
    display: boolean = false;

    minDate: Date;
    date: Date;

    countryFrom: string;
    countryTo: string;

    value: number = 0;

    // TODO set min and max price
    minPrice: number = 1;
    maxPrice: number = 50;
    rangePrice: number[] = [this.minPrice, this.maxPrice];

    experience: string = 'NoMatterExperience';
    carType: string = 'NoMatterCarType';

    isPaginator: boolean = true;

    photo: string = 'man';

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
                console.log(self.resultTrips);
                if(self.resultTrips.length === 0) this.isPaginator = false;
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
        this.showErrorSeatNumber = !this.seatNumber;

        if (! this.seatNumber) return;
    }

    openReserve() {
        this.display = true;
    }

    sort() {
        // let filters = {};
        // if(this.carType !== 'NoMatterCarType')
        //     filters['carType'] = this.carType;
        // if(this.experience !== 'NoMatterExperience')
        //     filters['experience'] = this.experience;
        // let result = dataUsers.filter(user => {
        //     for (let key in filters) {
        //         if (!(filters[key] === user[key])) return false;
        //     }
        //     return true;
        // });
        //
        // this.users = result;
        // this.numberOfResultTrips = result.length;
    }

    reverseDestination() {
        let key = this.countryFrom;
        this.countryFrom = this.countryTo;
        this.countryTo = key;
    }
}
