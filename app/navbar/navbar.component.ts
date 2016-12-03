import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: [ 'navbar.component.css' ]
})

export class NavBarComponent {
    constructor(private router: Router) {

    }
    goToHome(): void {
        this.router.navigate(['/home']);
    }
}