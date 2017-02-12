import {Injectable, OnInit} from '@angular/core';
import 'node_modules/rxjs/add/operator/map';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticationService {

    static logged: BehaviorSubject<boolean> = new BehaviorSubject(!!localStorage.getItem('name'));
    static incorrectCredentials: Subject<boolean> = new Subject();

    static isLogged(): boolean {
        return this.logged.getValue();
    }

    static login(name: string, password: string): void {
        localStorage.setItem('name', name);
        localStorage.setItem('password', password);
        this.logged.next(true);
    }

    static logout(): void {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        this.logged.next(false);
    }

}
