import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: [ 'home.component.css' , 'contact_us.component.css']
})

export class HomeComponent {
    title: string;
    registration: string;
    enter: string;

    constructor(private router: Router) {
        this.title = 'Кто со мной?';
        this.registration = "Регистрация";
        this.enter = "Войти";
    }

    goToLogin(): void {
        this.router.navigate(['/login']);
    }
}