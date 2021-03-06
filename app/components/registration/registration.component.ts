import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {AuthenticationService} from "../../services/utils/authentication.service";
import {RequestService} from "../../services/utils/request.service";

@Component({
    moduleId: module.id,
    selector: 'app-registration',
    templateUrl: 'registration.component.html',
    styleUrls: [ 'registration.component.css']
})

export class RegistrationComponent{

    constructor(private router: Router,
                private requestService: RequestService) {}

    id: number;
    name: string;
    gender: string = 'man';
    password: string;
    repeatPassword: string;
    age: number;
    mail: string;
    phone: number;

    showErrorName: boolean = false;
    showErrorPassword: boolean = false;
    showErrorRepeatPassword: boolean = false;
    showErrorAge: boolean = false;
    showErrorMail: boolean = false;
    showErrorPhone: boolean = false;
    showErrorRegistration: string;

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
                'age': this.age,
                'gender': this.gender,
                'email': this.mail,
                'phone': this.phone
            }
        };

        this.requestService.createUser(data)
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