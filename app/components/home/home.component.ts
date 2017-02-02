import {Component, OnInit} from "@angular/core";
import dataCars from "../../services/json/dataCars";

export interface Car {
    vin: any;
    year: any;
    brand: any;
    color: any;
}

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: [ 'home.component.css']
})

export class HomeComponent implements OnInit{
    cars: Car[];
    selectedCar: Car;

    displayDialog: boolean;

    ngOnInit(): void {
        this.cars = dataCars;
    }

    selectCar(car: Car) {
        this.selectedCar = car;
        this.displayDialog = true;
    }

    onDialogHide() {
        this.selectedCar = null;
    }
}
