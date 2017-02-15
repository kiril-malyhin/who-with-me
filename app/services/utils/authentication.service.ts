import {Injectable} from '@angular/core';
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

    static login(name: string, id: string): void {
        localStorage.setItem('name', name);
        localStorage.setItem('id', id);
        this.logged.next(true);
    }

    static getUserCredentials(): {name: string, id: string} {
        let name = localStorage.getItem('name');
        let id = localStorage.getItem('id');
        return {name, id};
    }

    static logout(): void {
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        localStorage.removeItem('destinationFrom');
        localStorage.removeItem('destinationTo');
        localStorage.removeItem('destinationDate');
        this.logged.next(false);
    }

}
