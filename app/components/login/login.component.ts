import {Component, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/utils/authentication.service";
import {Observable} from "rxjs/Rx";
import {Response, Headers, Http} from "@angular/http";

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {

    showErrorName: boolean = false;
    showErrorPassword: boolean = false;
    isRememberMe: boolean = false;
    showErrorCredentials: boolean = false;

    name: string;
    password: string;
    id: string;

    constructor(private router: Router,
                private ref: ElementRef,
                public http: Http) {
        Observable.fromEvent(this.ref.nativeElement, 'keyup').subscribe((e: KeyboardEvent) => {
            if (e.keyCode === 13) {
                this.login();
            }
        });
    }

    login(): void {
        this.showErrorCredentials = false;
        this.showErrorName = !this.name;
        this.showErrorPassword = !this.password;

        if (!this.name || !this.password) {
            return;
        }

        this.http.get("http://localhost:4000/users")
            .toPromise()
            .then(res => {
                let self = this;
                res.json().forEach(function (user: any) {
                    if (user.name === self.name) {
                        self.id = user.id;
                    }
                })
            })
            .then(() => {
                let data = {
                    user: {
                        'id': this.id,
                        'name': this.name,
                        'password': this.password,
                    }
                };
                this.http.post("http://localhost:4000/user_auth", data)
                .toPromise()
                .then(res => {
                    AuthenticationService.login(res.json().name, res.json().id);
                    this.router.navigate(['/search']);
                })
                .catch(() => {
                    this.showErrorCredentials = true;
                })}
            );
    }

    register() {
        this.router.navigate(['/registration'])
    }
}