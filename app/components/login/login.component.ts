import {Component, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/utils/authentication.service";
import {Observable} from "rxjs/Rx";
import {Response, Headers, Http} from "@angular/http";

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: [ 'login.component.css' ]
})

export class LoginComponent {

    showErrorName: boolean = false;
    showErrorPassword: boolean = false;
    isRememberMe: boolean = false;
    showErrorCredentials: boolean = false;

    name: string;
    password: string;

    constructor(private router: Router,
                private ref: ElementRef,
                public http: Http) {
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
        this.showErrorName = !this.name;
        this.showErrorPassword = !this.password;

        if (!this.name || !this.password) {
            return;
        }

        // let data = {
        //     user: {
        //         'name': this.name,
        //         'password': this.password
        //     }
        // };
        // this.http.post("http://localhost:4000/users/", data)
        //     .subscribe((res: Response) => {
        //         console.log(res.json());
        //     });

        // AuthenticationService.login(this.name, this.password);
    }

    register() {
        this.router.navigate(['/registration'])
    }
}