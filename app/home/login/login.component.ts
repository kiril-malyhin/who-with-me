import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: [ 'login.component.css' ]
})

export class LoginComponent {

    constructor(private router: Router) {
        // this.login = [
        //     {
        //         username: 'test',
        //         password: 'test'
        //     }
        // ]
    }

    goToSearch(): void {
        this.router.navigate(['/search']);
    }
}