import {Component, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/utils/authentication.service";
import {Observable} from "rxjs/Rx";

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: [ 'login.component.css' ]
})

export class LoginComponent {

    showErrorUsername: boolean = false;
    showErrorPassword: boolean = false;
    isRememberMe: boolean = false;
    showErrorCredentials: boolean = false;

    username: string;
    password: string;

    constructor(private router: Router,private ref: ElementRef) {
        AuthenticationService.logged.subscribe(value => {
            if (value) {
                this.goToSearch();
            }
        });

        AuthenticationService.incorrectCredentials.subscribe(value => {
            this.showErrorCredentials = value;
        });

        Observable.fromEvent(this.ref.nativeElement, 'keyup').subscribe((e: KeyboardEvent) => {
            if (e.keyCode === 13) {
                this.login();
            }
        });
    }

    goToSearch() {
        this.router.navigate(['/search']);
    }

    login(): void {
        this.showErrorCredentials = false;
        this.showErrorUsername = !this.username;
        this.showErrorPassword = !this.password;

        if (!this.username || !this.password) {
            return;
        }

        AuthenticationService.login(this.username, this.password);
    }

    register() {
        this.router.navigate(['/registration'])
    }
}