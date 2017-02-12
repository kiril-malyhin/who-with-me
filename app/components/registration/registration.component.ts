import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {AuthenticationService} from "../../services/utils/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'app-registration',
    templateUrl: 'registration.component.html',
    styleUrls: [ 'registration.component.css']
})

export class RegistrationComponent implements OnInit{

    constructor(public http: Http,
                private router: Router) {}

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

    id: number;
    name: string;
    gender: string = 'man';
    password: string;
    repeatPassword: string;
    age: number;
    mail: string;
    phone: number;
    carType: string;
    experience: number;

    showErrorName: boolean = false;
    showErrorPassword: boolean = false;
    showErrorRepeatPassword: boolean = false;
    showErrorAge: boolean = false;
    showErrorMail: boolean = false;
    showErrorPhone: boolean = false;
    showErrorRegistration: string;

    cars: Array<Object>;
    levels: Array<Object>;

    signUp() {
        this.showErrorRegistration = null;
        this.showErrorName = !this.name;
        this.showErrorPassword = !this.password;
        this.showErrorAge = !this.age;
        this.showErrorMail = !this.mail;
        this.showErrorPhone = !this.phone;

        if (this.password != this.repeatPassword)  {
            this.showErrorRepeatPassword = true;
            return;
        }

        if (!this.name || !this.password || !this.age || !this.mail || !this.phone || !this.repeatPassword) {
            return;
        }

        let data = {
            user: {
                'name': this.name,
                'password': this.password,
                'gender': this.gender,
                'email': this.mail,
                'phone': this.phone,
                'car_type': this.carType,
                'drive_level': this.experience
            }
        };

        this.http.post("http://localhost:4000/users/", data)
            .toPromise()
            .then(res => {
                AuthenticationService.login(res.json().name, res.json().id);
                this.router.navigate(['/search']);
            })
            .catch(res => {
                if (res.status === 422) {
                    this.showErrorRegistration = res.json().name[0];
                }
            });
    }
}