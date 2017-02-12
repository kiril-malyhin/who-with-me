import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Response, Http} from "@angular/http";

@Component({
    moduleId: module.id,
    selector: 'app-registration',
    templateUrl: 'registration.component.html',
    styleUrls: [ 'registration.component.css']
})

export class RegistrationComponent implements OnInit{

    constructor(public http: Http) {}

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

    showErrorName: boolean = false;
    showErrorPassword: boolean = false;
    showErrorRepeatPassword: boolean = false;
    showErrorAge: boolean = false;
    showErrorMail: boolean = false;
    showErrorPhone: boolean = false;

    name: string;
    gender: string = 'man';
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
        this.showErrorName = !this.name;
        this.showErrorPassword = !this.password;
        this.showErrorAge = !this.age;
        this.showErrorMail = !this.mail;
        this.showErrorPhone = !this.phone;

        if (this.password != this.repeatPassword)  this.showErrorRepeatPassword = true;

        if (!this.name || !this.password || !this.age || !this.mail || !this.phone || !this.repeatPassword) {
            return;
        }

        let data = {
            user: {
                'name': this.name,
                'password': this.password,
                'gender': this.gender
            }
        };
        this.http.post("http://localhost:4000/users/", data)
            .subscribe((res: Response) => {
                console.log(res.json());
            });

        // AuthenticationService.login(this.username, this.password);
    }
}