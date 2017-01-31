import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-start',
    templateUrl: 'start.component.html',
    styleUrls: [ 'start.component.css']
})

export class HomeComponent {
    title: string;
    registration: string;
    enter: string;

    constructor(private router: Router) {
        this.title = 'Who with me?';
        this.registration = "Registration";
        this.enter = "Login";
    }
}