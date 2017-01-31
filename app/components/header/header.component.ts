import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/utils/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'app-navbar',
    templateUrl: 'header.component.html',
    styleUrls: [ 'header.component.css' ]
})

export class NavBarComponent {

    isUserLogged: boolean;
    constructor(private router: Router) {
        AuthenticationService.logged.subscribe(value => {
            this.isUserLogged = !!value;
            if (!value) {
                this.goToHome();
            }
        });
    }
    goToHome(): void {
        this.router.navigate(['/start']);
    }

    logout() {
        AuthenticationService.logout();
    }
}