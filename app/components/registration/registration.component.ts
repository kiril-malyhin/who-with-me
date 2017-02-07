import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-registration',
    templateUrl: 'registration.component.html',
    styleUrls: [ 'registration.component.css']
})

export class RegistrationComponent implements OnInit{
    ngOnInit(): void {
        this.cars = [
            {type: "Standard"},
            {type: "Premium"},
            {type: "Luxury"}
        ];

        this.levels = [
            {type: "Junior"},
            {type: "Middle"},
            {type: "Expert"}
        ]
    }

    showErrorUsername: boolean = false;
    showErrorPassword: boolean = false;
    showErrorRepeatPassword: boolean = false;
    showErrorAge: boolean = false;
    showErrorMail: boolean = false;
    showErrorPhone: boolean = false;

    username: string;
    password: string;
    repeatPassword: string;
    age: number;
    mail: string;
    phone: number;
    carType: string;
    experience: number;

    cars: Array<Object>;
    levels: Array<Object>;

    signUp() {
        this.showErrorUsername = !this.username;
        this.showErrorPassword = !this.password;
        this.showErrorAge = !this.age;
        this.showErrorMail = !this.mail;
        this.showErrorPhone = !this.phone;

        if (this.password != this.repeatPassword)  this.showErrorRepeatPassword = true;

        if (!this.username || !this.password || !this.age || !this.mail || !this.phone || !this.repeatPassword) {
            return;
        }
    }
}