import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: [ 'profile.component.css']
})

export class ProfileComponent {
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

    addTrip() {
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